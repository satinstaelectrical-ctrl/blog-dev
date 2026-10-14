const fs = require('fs');

const p1 = fs.readFileSync('public/app.part1.js', 'utf8');
const p2 = fs.readFileSync('public/app.part2_helpers.js', 'utf8');

const missing = [
  'cycleTheme',
  'saveArticleToServer',
  'uploadMediaToServer',
  'deleteMediaFromServer',
  'deleteSubscriberFromServer',
  'moderateComment'
];

missing.forEach(name => {
  console.log(`${name} in p1:`, p1.includes(name), `in p2:`, p2.includes(name));
});
