const fs = require('fs');
const p2 = fs.readFileSync('public/app.part2_helpers.js', 'utf8');
const lines = p2.split('\n');

function printRange(start, end) {
  console.log(`\n=== Lines ${start}-${end} ===`);
  console.log(lines.slice(start - 1, end).join('\n'));
}

printRange(370, 420);
printRange(440, 470);
printRange(540, 560);
printRange(875, 940);
