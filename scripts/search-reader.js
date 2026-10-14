const fs = require('fs');

const app = fs.readFileSync('public/app.js', 'utf8');

// Search for renderReaderPage everywhere in app.js
const lines = app.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('renderReaderPage')) {
    console.log(`Line ${idx + 1}: ${l}`);
  }
});
