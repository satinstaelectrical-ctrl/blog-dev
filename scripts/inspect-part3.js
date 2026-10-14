const fs = require('fs');
const app = fs.readFileSync('public/app.js', 'utf8');
const lines = app.split('\n');

console.log('Total lines in app.js:', lines.length);
console.log('Line 2650:');
console.log(lines.slice(2645, 2670).join('\n'));
