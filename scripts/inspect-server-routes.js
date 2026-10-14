const fs = require('fs');
const server = fs.readFileSync('server.js', 'utf8');

const lines = server.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('if (pathname ===') || l.includes('if (pathname.startsWith(') || l.includes('if (method ===')) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});
