const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
console.log('localStorage in index.html:', html.includes('localStorage'));
