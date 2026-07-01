const fs = require('fs');
const path = require('path');
const chromeLauncher = require('chrome-launcher');

(async () => {
  const lighthouseModule = await import('lighthouse');
  const lighthouse = lighthouseModule.default || lighthouseModule.lighthouse || lighthouseModule;

  const chromePath = process.env.CHROME_PATH || 'C:\\Users\\sheev\\AppData\\Local\\ms-playwright\\chromium-1208\\chrome-win64\\chrome.exe';
  const targetUrl = process.env.TARGET_URL || 'http://localhost:4173';
  const outBase = process.env.LH_OUT || path.resolve(process.cwd(), 'lighthouse-report');

  const chrome = await chromeLauncher.launch({
    chromePath,
    chromeFlags: ['--headless=new', '--disable-gpu', '--no-sandbox'],
  });

  let runError = null;

  try {
    const result = await lighthouse(targetUrl, {
      port: chrome.port,
      output: ['json', 'html'],
      logLevel: 'error',
      onlyCategories: ['performance'],
      formFactor: 'desktop',
      screenEmulation: { mobile: false, width: 1365, height: 768, deviceScaleFactor: 1, disabled: false },
    });

    const reports = result.report;
    const [jsonReport, htmlReport] = Array.isArray(reports) ? reports : [reports];

    fs.writeFileSync(`${outBase}.report.json`, jsonReport, 'utf8');
    if (htmlReport) {
      fs.writeFileSync(`${outBase}.report.html`, htmlReport, 'utf8');
    }

    const lhr = result.lhr;
    const audits = lhr.audits;
    const summary = {
      score: Math.round((lhr.categories.performance.score || 0) * 100),
      fcp: audits['first-contentful-paint']?.displayValue,
      lcp: audits['largest-contentful-paint']?.displayValue,
      speedIndex: audits['speed-index']?.displayValue,
      tbt: audits['total-blocking-time']?.displayValue,
      cls: audits['cumulative-layout-shift']?.displayValue,
      tti: audits['interactive']?.displayValue,
    };

    console.log(JSON.stringify(summary, null, 2));

    const opportunities = Object.values(audits)
      .filter((audit) => audit?.details?.type === 'opportunity')
      .map((audit) => ({
        id: audit.id,
        title: audit.title,
        displayValue: audit.displayValue || '',
        savingsMs: Math.round(audit.details.overallSavingsMs || 0),
      }))
      .sort((a, b) => b.savingsMs - a.savingsMs)
      .slice(0, 8);

    console.log('\nTop opportunities:');
    for (const item of opportunities) {
      console.log(`- ${item.id} | ${item.title} | ${item.displayValue} | ${item.savingsMs}ms`);
    }
  } catch (error) {
    runError = error;
  } finally {
    try {
      await chrome.kill();
    } catch (killError) {
      console.warn('Chrome cleanup warning:', killError.message || killError);
    }
  }

  if (runError) {
    throw runError;
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
