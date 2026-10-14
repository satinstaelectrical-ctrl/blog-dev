const fs = require('fs');
const server = fs.readFileSync('server.js', 'utf8');

const lines = server.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('/api/auth/')) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});
