const fs = require('fs');

const app = fs.readFileSync('public/app.js', 'utf8');
const lines = app.split('\n');

lines.forEach((line, idx) => {
  if (line.startsWith('// ===') || line.startsWith('function renderAdmin')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
