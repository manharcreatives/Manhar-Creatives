import { launch } from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync } from 'fs';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';

if (process.env.VERCEL || process.env.CI) {
  console.log('[prerender] Skipping in CI/Vercel environment');
  process.exit(0);
}

const PORT = 45678;
const DIST = join(fileURLToPath(new URL('.', import.meta.url)), 'dist');

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
};

const server = createServer((req, res) => {
  const url = req.url.replace(/\?.*$/, '');
  const filePath = join(DIST, url === '/' ? 'index.html' : url);
  try {
    const content = readFileSync(filePath);
    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  } catch {
    if (url.startsWith('/assets/')) {
      res.writeHead(404);
      return res.end('Not found');
    }
    const fallback = readFileSync(join(DIST, 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fallback);
  }
});

server.listen(PORT, async () => {
  console.log(`[prerender] Server started on http://localhost:${PORT}`);
  try {
    const browser = await launch({ headless: true });
    const page = await browser.newPage();
    page.on('pageerror', err => console.error('[prerender] Page error:', err.message));
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('#contact', { timeout: 20000 });
    await new Promise(r => setTimeout(r, 1500));
    const html = await page.content();
    const outputPath = join(DIST, 'index.html');
    writeFileSync(outputPath, html, 'utf-8');
    console.log(`[prerender] Written to ${outputPath} (${(html.length / 1024).toFixed(0)} KB)`);
    await browser.close();
  } catch (err) {
    console.error('[prerender] Failed:', err.message);
    process.exit(1);
  } finally {
    server.close();
  }
});
