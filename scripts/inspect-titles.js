const fs = require('fs');
const app = fs.readFileSync('public/app.js', 'utf8');
const lines = app.split('\n');

const sectionLines = [1, 797, 949, 1472, 1718, 1768, 1881, 2647, 2923, 4499];

sectionLines.forEach(l => {
  console.log(`\n--- Line ${l} ---`);
  console.log(lines.slice(l - 1, l + 5).join('\n'));
});
