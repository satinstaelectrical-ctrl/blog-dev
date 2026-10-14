const fs = require('fs');

const p2 = fs.readFileSync('public/app.part2_helpers.js', 'utf8');
const lines = p2.split('\n');
console.log('p2 lines:', lines.length);
console.log('--- FIRST 20 LINES ---');
console.log(lines.slice(0, 20).join('\n'));
console.log('--- LAST 20 LINES ---');
console.log(lines.slice(-20).join('\n'));
