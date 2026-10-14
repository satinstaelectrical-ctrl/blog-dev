const fs = require('fs');

const p1 = fs.readFileSync('public/app.part1.js', 'utf8');
const p2 = fs.readFileSync('public/app.part2_helpers.js', 'utf8');
const p3 = fs.readFileSync('public/app.part2_views.js', 'utf8');

const merged = p1 + '\n\n' + p2 + '\n\n' + p3;
fs.writeFileSync('public/app.js', merged, 'utf8');

console.log('Successfully merged into public/app.js!');
console.log('Total length:', merged.length, 'characters');
console.log('Total lines:', merged.split('\n').length);
