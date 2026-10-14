const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const lines = html.split('\n');
console.log('index.html total lines:', lines.length);
console.log('--- FIRST 40 LINES ---');
console.log(lines.slice(0, 40).join('\n'));
