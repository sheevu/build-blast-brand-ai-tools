import { writeFile } from 'node:fs/promises';
import { serviceCatalog } from '../src/data/serviceCatalog.js';

const today = new Date().toISOString().slice(0, 10);
const staticUrls = [
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/services', priority: '0.9', changefreq: 'weekly' },
  { loc: '/faq', priority: '0.8', changefreq: 'monthly' },
];

const serviceUrls = serviceCatalog.map((service) => ({
  loc: `/services/${service.slug}`,
  priority: service.type === 'Bundle Pack' ? '0.9' : '0.8',
  changefreq: 'weekly',
}));

const entries = [...staticUrls, ...serviceUrls].map(({ loc, priority, changefreq }) => `  <url>
    <loc>https://vyapai.in${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${today}</lastmod>
  </url>`).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap, 'utf8');
console.log(`Generated sitemap with ${staticUrls.length + serviceUrls.length} URLs.`);
