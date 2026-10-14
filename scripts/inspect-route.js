const fs = require('fs');

const app = fs.readFileSync('public/app.js', 'utf8');

// Find routing handling for admin and login
const lines = app.split('\n');
lines.forEach((l, idx) => {
  if (l.includes("admin") && (l.includes("route") || l.includes("navigate") || l.includes("case 'admin'") || l.includes("hash === '#admin'") || l.includes("renderReaderPage"))) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});
