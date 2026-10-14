const fs = require('fs');

const gitLog = require('child_process').execSync('git log -p -n 2 public/app.js', { encoding: 'utf8' });
const lines = gitLog.split('\n');

lines.forEach((l, idx) => {
  if (l.includes('renderReaderPage') || l.includes('route === \'admin\'') || l.includes('route === \'login\'')) {
    console.log(`Line ${idx + 1}: ${l}`);
  }
});
