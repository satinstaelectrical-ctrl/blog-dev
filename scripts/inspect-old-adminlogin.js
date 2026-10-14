const { execSync } = require('child_process');

try {
  const oldApp = execSync('git show HEAD~1:public/app.js', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  const lines = oldApp.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('function renderAdminLogin')) {
      console.log(`Line ${idx + 1}:`);
      console.log(lines.slice(idx, idx + 40).join('\n'));
    }
  });
} catch (e) {
  console.error(e.message);
}
