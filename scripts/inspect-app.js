const fs = require('fs');

const app = fs.readFileSync('public/app.js', 'utf8');
const lines = app.split('\n');
console.log('Original app.js lines:', lines.length);

// Search for renderAdmin in original app.js
lines.forEach((line, idx) => {
  if (line.includes('function renderAdmin(') || line.includes('function renderAdminDashboard(') || line.includes('function renderGutenbergEditor(')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
