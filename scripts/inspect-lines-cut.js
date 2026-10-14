const fs = require('fs');
const app = fs.readFileSync('public/app.js', 'utf8');
const lines = app.split('\n');

console.log('--- Lines 815-830 ---');
console.log(lines.slice(814, 830).join('\n'));

console.log('\n--- Lines 1035-1055 ---');
console.log(lines.slice(1034, 1055).join('\n'));
