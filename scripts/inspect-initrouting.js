const fs = require('fs');
const app = fs.readFileSync('public/app.js', 'utf8');
const lines = app.split('\n');

lines.forEach((l, idx) => {
  if (l.includes('function initRouting')) {
    console.log(`Line ${idx + 1}:`);
    console.log(lines.slice(idx, idx + 35).join('\n'));
  }
});
