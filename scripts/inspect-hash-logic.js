const fs = require('fs');

const app = fs.readFileSync('public/app.js', 'utf8');

// Check line 770-815
const lines = app.split('\n');
console.log(lines.slice(760, 815).join('\n'));
