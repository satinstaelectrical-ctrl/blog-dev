const fs = require('fs');
const server = fs.readFileSync('server.js', 'utf8');
const lines = server.split('\n');
console.log(lines.slice(745, 770).join('\n'));
