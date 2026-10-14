const { execSync } = require('child_process');

try {
  const oldApp = execSync('git show HEAD~1:public/app.js', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  const lines = oldApp.split('\n');
  console.log(lines.slice(660, 700).join('\n'));
} catch (e) {
  console.error(e.message);
}
