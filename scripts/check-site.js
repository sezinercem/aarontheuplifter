const fs = require('fs');
const path = require('path');

const pages = ['index.html', 'music.html', 'live.html', 'about.html', 'press.html', 'contact.html'];
let failed = false;

for (const page of pages) {
  const html = fs.readFileSync(path.join(process.cwd(), page), 'utf8');
  const required = ['<!doctype html>', '<title>', 'styles.css', 'script.js', 'Impact'];
  for (const token of required.slice(0, 4)) {
    if (!html.includes(token)) {
      console.error(`${page}: missing ${token}`);
      failed = true;
    }
  }
}

const css = fs.readFileSync(path.join(process.cwd(), 'styles.css'), 'utf8');
for (const token of ['Impact', 'hero-pink-suit-couch.jpeg', 'live-burgundy-jacket.jpeg', 'about-black-tshirt-headshot.jpeg']) {
  if (!css.includes(token)) {
    console.error(`styles.css: missing ${token}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`Checked ${pages.length} pages and shared assets.`);
