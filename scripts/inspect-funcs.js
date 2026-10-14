const fs = require('fs');
const app = fs.readFileSync('public/app.js', 'utf8');
const lines = app.split('\n');

// Find all function declarations between 2650 and 4544
lines.slice(2649).forEach((line, idx) => {
  const lineNum = 2650 + idx;
  if (line.match(/^function\s+[a-zA-Z0-9_]+\s*\(/)) {
    console.log(`Line ${lineNum}: ${line}`);
  }
});
