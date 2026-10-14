const fs = require('fs');
const app = fs.readFileSync('public/app.js', 'utf8');
const lines = app.split('\n');

console.log('--- Lines 2925-2980 ---');
console.log(lines.slice(2924, 2980).join('\n'));
