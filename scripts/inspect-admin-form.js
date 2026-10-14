const fs = require('fs');
const app = fs.readFileSync('public/app.js', 'utf8');

const lines = app.split('\n');
console.log(lines.slice(2150, 2245).join('\n'));
