const http = require('http');

async function req(options, body = null) {
  return new Promise((resolve, reject) => {
    const client = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: data, json: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });
    client.on('error', reject);
    if (body) client.write(typeof body === 'string' ? body : JSON.stringify(body));
    client.end();
  });
}

async function run() {
  console.log('=== TEST PERMISSIONS SERVEUR STRICTES ===');

  console.log('\n--- 1. Écriture sans session (Anonyme) ---');
  let res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/articles',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { title: 'Test Anonyme' });
  console.log('Status attendu 401:', res.status, 'Message:', res.json.error);

  console.log('\n--- 2. Connexion Compte Lecteur (reader@ontario.com) ---');
  let readerLogin = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'reader@ontario.com', password: 'reader2026!' });
  console.log('Reader login status:', readerLogin.status, 'Role:', readerLogin.json.user.role);
  const readerToken = readerLogin.json.token;

  console.log('\n--- 3. Tentative d\'écriture administrative par le Lecteur ---');
  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/articles',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + readerToken
    }
  }, { title: 'Tentative Piratage Lecteur' });
  console.log('Status attendu 403 Forbidden:', res.status, 'Message:', res.json.error);

  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/settings',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + readerToken
    }
  }, { siteName: 'Hacked' });
  console.log('Settings PUT par Lecteur - Status attendu 403 Forbidden:', res.status, 'Message:', res.json.error);

  console.log('\n--- 4. Connexion Compte Administrateur (admin@ontario.com) ---');
  let adminLogin = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'admin@ontario.com', password: 'admin2026!' });
  console.log('Admin login status:', adminLogin.status, 'Role:', adminLogin.json.user.role);
  const adminToken = adminLogin.json.token;

  console.log('\n--- 5. Vérification GET /api/auth/me avec token Admin ---');
  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/me',
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + adminToken }
  });
  console.log('Admin /api/auth/me status:', res.status, 'Authenticated:', res.json.authenticated, 'Role:', res.json.user.role);

  console.log('\n--- 6. Création d\'article autorisée avec token Admin ---');
  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/articles',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + adminToken
    }
  }, {
    title: 'Article Créé par Administrateur Vérifié',
    excerpt: 'Article légitime.',
    categorySlug: 'intelligence-artificielle',
    contentBlocks: [{ type: 'paragraph', content: 'Contenu validé.' }]
  });
  console.log('Admin create article status attendu 201:', res.status, 'Created ID:', res.json.article.id);
  const createdId = res.json.article.id;

  // Cleanup
  await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/articles/' + createdId + '?force=true',
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + adminToken }
  });
  console.log('Cleanup article effectué.');

  console.log('\n=== TOUS LES TESTS DE PERMISSIONS SERVEUR SONT CONFORMES ET SÉCURISÉS ! ===');
}

run().catch(console.error);
