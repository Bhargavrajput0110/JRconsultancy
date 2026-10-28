import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('index.html not found in dist');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

const routes = [
  'admin',
  'admin/login',
  'crm',
  'dashboard',
  'about',
  'services',
  'process',
  'portfolio',
  'case-studies',
  'packages',
  'faq',
  'start',
  'contact'
];

routes.forEach((route) => {
  const targetDir = path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), indexContent, 'utf8');
});

// Also write 404.html and root admin.html for direct file matching
fs.writeFileSync(path.join(distDir, '404.html'), indexContent, 'utf8');
fs.writeFileSync(path.join(distDir, 'admin.html'), indexContent, 'utf8');
fs.writeFileSync(path.join(distDir, 'crm.html'), indexContent, 'utf8');
fs.writeFileSync(path.join(distDir, 'dashboard.html'), indexContent, 'utf8');

console.log(`Successfully generated static HTML fallbacks for ${routes.length} SPA routes.`);
