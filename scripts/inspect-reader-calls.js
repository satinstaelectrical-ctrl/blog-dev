const fs = require('fs');
const app = fs.readFileSync('public/app.js', 'utf8');

const lines = app.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('renderReaderPage') || l.includes('ontario_reader_user') || l.includes('ontario_admin_session')) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});
