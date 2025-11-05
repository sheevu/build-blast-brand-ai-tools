import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader, Clipboard, Search } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// --- Helper Functions ---

/**
 * Calls the Gemini API with Google Search grounding.
 */
const callGeminiApiWithSearch = async (systemPrompt, userQuery) => {
  const apiKey = ""; // API key is handled by the environment
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    // Enable Google Search
    tools: [{ "google_search": {} }],
  };

  // Implement fetch with exponential backoff
  let response;
  let delay = 1000; // start with 1 second
  for (let i = 0; i < 5; i++) { // Retry up to 5 times
    try {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        // The final, AI-processed text is in the candidate's content
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (text) {
          return text;
        } else {
          console.error("API response missing text:", result);
          throw new Error("Invalid API response structure");
        }
      } else if (response.status === 429 || response.status >= 500) {
        // Throttling or server error, wait and retry
        console.warn(`API call failed with status ${response.status}, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Double the delay
      } else {
        // Other client-side error, don't retry
        console.error(`API call failed with status ${response.status}`);
        const errorResult = await response.json();
        console.error("API error details:", errorResult);
        throw new Error(`API Error: ${errorResult.error?.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      if (i === 4) { // Last attempt failed
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
  throw new Error("AI analysis failed after multiple retries.");
};

/**
 * Saves the analysis log to Firestore.
 */
const saveAnalysisToFirestore = async (db, userId, businessName, location, result) => {
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
  // Use a new collection for this specific tool
  const analysisPath = `/artifacts/${appId}/users/${userId}/presence_analysis`;
  
  try {
    const docRef = await addDoc(collection(db, analysisPath), {
      businessName,
      location,
      result,
      createdAt: serverTimestamp(),
    });
    console.log("Analysis saved with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document to Firestore: ", e);
  }
};

// --- Main Component ---
export default function OnlinePresenceAnalyzer({ db, auth, userId }) {
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("Lucknow"); // Default to Lucknow
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleAnalyze = async () => {
    if (!businessName || !location) {
      setError("Please enter a business name and location.");
      return;
    }
    if (!auth?.currentUser || !userId) {
      setError("Authentication error. Please refresh the page.");
      console.error("Auth or UserID is missing.", { auth, userId });
      return;
    }

    setIsLoading(true);
    setResult("");
    setError("");

    // --- The Core Prompts ---
    const systemPrompt = `You are an expert Local SEO analyzer for Indian MSMEs, specializing in Lucknow and UP. You will be given Google Search results for a business. Your task is to analyze these snippets and provide 5 actionable, high-impact tips in simple English/Hinglish for how this business can improve its online presence in its local area. Focus on Google Business Profile (GMB), local keywords, and building trust. Address the user directly as the business owner. Format your response in Markdown, using bullet points for the tips.`;
    
    const userQuery = `Analyze the online presence for a business called "${businessName}" in "${location}". Base your analysis *only* on the provided Google Search results and give me 5 tips to improve it.`;

    try {
      const generatedText = await callGeminiApiWithSearch(systemPrompt, userQuery);
      
      // Simple Markdown-to-HTML (for bold text and lists)
      const formattedText = generatedText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/^\* (.*)$/gm, '<li class="mt-2">$1</li>') // List items
        .replace(/(\<li.*\>[\s\S]*\<\/li\>)/g, '<ul class="list-disc list-outside pl-5 mt-2">$1</ul>'); // Wrap lists

      setResult(formattedText);
      // Save to Firestore (don't block UI)
      saveAnalysisToFirestore(db, userId, businessName, location, generatedText); // Save raw text
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Analysis failed. This can happen if the business is not found or the AI is busy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Copy to clipboard
  const handleCopy = () => {
    const outputElement = document.getElementById("ai-output-analyzer");
    if (outputElement) {
      const textToCopy = outputElement.innerText; // Get text content
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset message
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#050814]/80 p-6 md:p-8 shadow-2xl">
      <div className="grid gap-6 md:grid-cols-2">
        {/* --- Input Column --- */}
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-white/80">
            1. Enter your Business Name
          </label>
          <input
            type="text"
            id="businessName"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g., 'Shukla Chaat House'"
            className="mt-2 block w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          />

          <label htmlFor="location" className="mt-4 block text-sm font-medium text-white/80">
            2. Enter your City / Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., 'Lucknow' or 'Hazratganj'"
            className="mt-2 block w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          />

          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="group mt-6 w-full inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#00F1A0] to-[#00FFFF] px-6 py-3 text-black font-semibold shadow-[0_0_25px_rgba(0,241,160,0.7)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,241,160,1)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Analyze My Presence
              </>
            )}
          </button>
          {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
        </div>

        {/* --- Output Column --- */}
        <div className="rounded-lg border border-white/10 bg-black/30 p-4 min-h-[300px] relative">
          <AnimatePresence>
            {result && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 right-4"
              >
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                  title="Copy to clipboard"
                >
                  <Clipboard className="h-4 w-4 text-white/70" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {copySuccess && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-14 right-4 text-xs bg-emerald-500 text-black px-2 py-1 rounded"
            >
              Copied!
            </motion.p>
          )}

          <div 
            id="ai-output-analyzer" 
            className="prose prose-invert prose-sm text-white/90"
            style={{ 
              '--tw-prose-bullets': '#00F1A0',
              '--tw-prose-strong': '#FFFFFF',
            }}
          >
            {isLoading && <p className="text-white/50"><i>Scanning Google and analyzing your presence...</i></p>}
            {!isLoading && !result && <p className="text-white/50">Your free analysis will appear here.</p>}
            {/* Render the formatted HTML */}
            <div dangerouslySetInnerHTML={{ __html: result }} />
          </div>
        </div>
      </div>
    </div>
  );
}
