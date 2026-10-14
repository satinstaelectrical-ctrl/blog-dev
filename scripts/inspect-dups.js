const fs = require('fs');
const p1 = fs.readFileSync('public/app.part1.js', 'utf8');
const lines = p1.split('\n');
console.log(lines.slice(1900, 1930).join('\n'));
