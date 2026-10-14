const fs = require('fs');
const p1 = fs.readFileSync('public/app.part1.js', 'utf8');

const lines = p1.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('Theme') || l.includes('theme')) {
    if (l.includes('function ') || l.includes('let ') || l.includes('const ')) {
      console.log(`Line ${idx + 1}: ${l.trim()}`);
    }
  }
});
