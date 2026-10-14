const fs = require('fs');

const p1 = fs.readFileSync('public/app.part1.js', 'utf8');
const lines = p1.split('\n');
console.log('p1 lines:', lines.length);
console.log('--- FIRST 15 LINES ---');
console.log(lines.slice(0, 15).join('\n'));
console.log('--- LAST 15 LINES ---');
console.log(lines.slice(-15).join('\n'));
