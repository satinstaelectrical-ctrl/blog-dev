const fs = require('fs');
const server = fs.readFileSync('server.js', 'utf8');
const lines = server.split('\n');
console.log(lines.slice(75, 125).join('\n'));
