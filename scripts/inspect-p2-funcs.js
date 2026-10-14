const fs = require('fs');
const p2 = fs.readFileSync('public/app.part2_helpers.js', 'utf8');
const lines = p2.split('\n');

lines.forEach((line, idx) => {
  if (line.match(/^function\s+[a-zA-Z0-9_]+\s*\(/)) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
