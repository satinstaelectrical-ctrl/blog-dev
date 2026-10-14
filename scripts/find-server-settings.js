const fs = require('fs');
const server = fs.readFileSync('server.js', 'utf8');
const lines = server.split('\n');

lines.forEach((l, idx) => {
  if (l.includes("pathname === '/api/settings'")) {
    console.log(`Line ${idx + 1}:`);
    console.log(lines.slice(idx, idx + 25).join('\n'));
  }
});
