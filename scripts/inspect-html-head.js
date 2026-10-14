const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const lines = html.split('\n');
console.log(lines.slice(38, 120).join('\n'));
