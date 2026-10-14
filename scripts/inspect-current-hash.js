const fs = require('fs');
const app = fs.readFileSync('public/app.js', 'utf8');

const lines = app.split('\n');
console.log('--- Lines 750 to 815 ---');
console.log(lines.slice(750, 815).join('\n'));
