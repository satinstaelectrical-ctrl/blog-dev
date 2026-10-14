const fs = require('fs');

const p1 = fs.readFileSync('public/app.part1.js', 'utf8');
const cutIndex = p1.indexOf('// 8. RENDERER DU DASHBOARD CMS ADMIN TYPE WORDPRESS');

if (cutIndex !== -1) {
  // Find the preceding comment banner
  const bannerIndex = p1.lastIndexOf('// ==========================================================================', cutIndex);
  const cleanP1 = p1.substring(0, bannerIndex).trimEnd() + '\n';
  fs.writeFileSync('public/app.part1.js', cleanP1, 'utf8');
  console.log('Successfully trimmed app.part1.js before section 8! New lines:', cleanP1.split('\n').length);
} else {
  console.log('Cut marker not found in app.part1.js');
}
