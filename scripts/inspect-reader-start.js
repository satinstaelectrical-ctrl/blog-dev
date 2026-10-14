const fs = require('fs');
const app = fs.readFileSync('public/app.js', 'utf8');
const lines = app.split('\n');

console.log('--- Lines 905-950 (renderReaderPage start) ---');
console.log(lines.slice(905, 950).join('\n'));
