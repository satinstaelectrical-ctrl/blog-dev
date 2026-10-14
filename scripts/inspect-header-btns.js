const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const lines = html.split('\n');
console.log(lines.slice(280, 320).join('\n'));
