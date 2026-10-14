const fs = require('fs');
const p2 = fs.readFileSync('public/app.part2_helpers.js', 'utf8');

const lines = p2.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('/api/')) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});
