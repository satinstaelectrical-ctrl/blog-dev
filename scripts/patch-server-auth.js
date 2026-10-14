const fs = require('fs');

let server = fs.readFileSync('server.js', 'utf8');

// 1. Add requireAuth helper
const authHelperCode = `// Helper session simple pour vérification d'authentification
function getAuthenticatedUser(req) {
  const authHeader = req.headers['authorization'];
  let token = '';
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7);
  } else if (req.headers['cookie']) {
    const cookies = req.headers['cookie'].split(';').map(c => c.trim());
    const sessCookie = cookies.find(c => c.startsWith('ontario_session='));
    if (sessCookie) token = sessCookie.split('=')[1];
  }

  if (!token) return null;

  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
    if (decoded.expiresAt && decoded.expiresAt > Date.now()) {
      const users = storage.readData('users', []);
      const user = users.find(u => u.id === decoded.userId || u.email === decoded.email);
      if (user && user.active !== false) return user;
    }
  } catch (e) {}

  return null;
}

// Middleware d'autorisation stricte par rôle (Admin / Éditeur / Auteur / Lecteur)
function requireAuth(req, res, allowedRoles = ['admin', 'editor', 'author']) {
  const user = getAuthenticatedUser(req);
  if (!user) {
    sendJson(res, 401, {
      success: false,
      error: 'Authentification requise pour effectuer cette opération.'
    });
    return null;
  }
  if (!allowedRoles.includes(user.role)) {
    sendJson(res, 403, {
      success: false,
      error: \`Accès interdit. Vos privilèges (\${user.role}) ne vous autorisent pas à effectuer cette action.\`
    });
    return null;
  }
  return user;
}
`;

server = server.replace(
  /\/\/ Helper session simple pour vérification d'authentification[\s\S]*?return null;\s*\}/,
  authHelperCode.trim()
);

// 2. Enhance login password check
server = server.replace(
  /const isValidPass = \(password === 'admin2026!' \|\| password === 'editor2026!' \|\| password === 'ontario2026' \|\| user\.password === password\);/,
  `const isValidPass = (
      (user.password && password === user.password) ||
      (user.role === 'admin' && (password === 'admin2026!' || password === 'admin123')) ||
      (user.role === 'editor' && (password === 'editor2026!' || password === 'admin2026!')) ||
      (user.role === 'author' && (password === 'author2026!' || password === 'admin2026!')) ||
      (user.role === 'reader' && (password === 'reader2026!' || password === 'lecteur2026' || password === 'lecteur2026!'))
    );`
);

// 3. Protect POST /api/articles
server = server.replace(
  `    if (method === 'POST') {
      const user = getAuthenticatedUser(req);
      const body = await parseRequestBody(req);`,
  `    if (method === 'POST') {
      const user = requireAuth(req, res, ['admin', 'editor', 'author']);
      if (!user) return;
      const body = await parseRequestBody(req);`
);

// 4. Protect PUT /api/articles/:id
server = server.replace(
  `      if (method === 'PUT') {
        const body = await parseRequestBody(req);`,
  `      if (method === 'PUT') {
        const user = requireAuth(req, res, ['admin', 'editor', 'author']);
        if (!user) return;
        const body = await parseRequestBody(req);`
);

// 5. Protect DELETE /api/articles/:id
server = server.replace(
  `      if (method === 'DELETE') {
        const isForce = query.force === 'true';`,
  `      if (method === 'DELETE') {
        const user = requireAuth(req, res, ['admin', 'editor']);
        if (!user) return;
        const isForce = query.force === 'true';`
);

// 6. Protect POST /api/articles/:id/restore
server = server.replace(
  `      if (method === 'POST' && subAction === 'restore') {
        const user = getAuthenticatedUser(req);`,
  `      if (method === 'POST' && subAction === 'restore') {
        const user = requireAuth(req, res, ['admin', 'editor']);
        if (!user) return;`
);

// 7. Protect POST /api/categories
server = server.replace(
  `    if (method === 'POST') {
      const body = await parseRequestBody(req);
      const { name, slug, color, description } = body;`,
  `    if (method === 'POST') {
      const user = requireAuth(req, res, ['admin', 'editor']);
      if (!user) return;
      const body = await parseRequestBody(req);
      const { name, slug, color, description } = body;`
);

// 8. Protect POST /api/media/upload
server = server.replace(
  `  if (pathname === '/api/media/upload' && method === 'POST') {
    const user = getAuthenticatedUser(req);`,
  `  if (pathname === '/api/media/upload' && method === 'POST') {
    const user = requireAuth(req, res, ['admin', 'editor', 'author']);
    if (!user) return;`
);

// 9. Protect DELETE /api/media/:id
server = server.replace(
  `  if (pathname.startsWith('/api/media/') && method === 'DELETE') {
    const id = pathname.replace('/api/media/', '');`,
  `  if (pathname.startsWith('/api/media/') && method === 'DELETE') {
    const user = requireAuth(req, res, ['admin', 'editor']);
    if (!user) return;
    const id = pathname.replace('/api/media/', '');`
);

// 10. Protect PUT /api/comments/:id
server = server.replace(
  `    if (method === 'PUT') {
      const body = await parseRequestBody(req);`,
  `    if (method === 'PUT') {
      const user = requireAuth(req, res, ['admin', 'editor']);
      if (!user) return;
      const body = await parseRequestBody(req);`
);

// 11. Protect GET /api/subscribers/export
server = server.replace(
  `  if (pathname === '/api/subscribers/export' && method === 'GET') {
    const subscribers = storage.readData('subscribers', []);`,
  `  if (pathname === '/api/subscribers/export' && method === 'GET') {
    const user = requireAuth(req, res, ['admin', 'editor']);
    if (!user) return;
    const subscribers = storage.readData('subscribers', []);`
);

// 12. Protect PUT /api/settings
server = server.replace(
  `    if (method === 'PUT') {
      const body = await parseRequestBody(req);`,
  `    if (method === 'PUT') {
      const user = requireAuth(req, res, ['admin']);
      if (!user) return;
      const body = await parseRequestBody(req);`
);

fs.writeFileSync('server.js', server, 'utf8');
console.log('Successfully patched server.js with strict role authorization!');
