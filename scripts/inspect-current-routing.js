const fs = require('fs');
const app = fs.readFileSync('public/app.js', 'utf8');

const lines = app.split('\n');
console.log('--- Lines 650 to 820 ---');
console.log(lines.slice(649, 820).join('\n'));
