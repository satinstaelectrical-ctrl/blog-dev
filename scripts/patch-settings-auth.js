const fs = require('fs');

let server = fs.readFileSync('server.js', 'utf8');

server = server.replace(
  `    if (method === 'PUT') {
      const user = getAuthenticatedUser(req);
      const body = await parseRequestBody(req);
      const updated = { ...settings, ...body };`,
  `    if (method === 'PUT') {
      const user = requireAuth(req, res, ['admin']);
      if (!user) return;
      const body = await parseRequestBody(req);
      const updated = { ...settings, ...body };`
);

server = server.replace(
  `    if (method === 'POST') {
      const admin = getAuthenticatedUser(req);
      const body = await parseRequestBody(req);`,
  `    if (method === 'POST') {
      const admin = requireAuth(req, res, ['admin']);
      if (!admin) return;
      const body = await parseRequestBody(req);`
);

fs.writeFileSync('server.js', server, 'utf8');
console.log('Patched settings PUT and users POST in server.js');
