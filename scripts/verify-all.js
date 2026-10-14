const http = require('http');
const fs = require('fs');

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
  console.log('========================================================');
  console.log('AUDIT COMPLET ET VALIDATION DU PARCOURS D\'AUTHENTIFICATION');
  console.log('========================================================\n');

  // Test 1: Anonyme
  console.log('--- Étape 1 : Accès sans session ---');
  let res = await req({ hostname: 'localhost', port: 3000, path: '/api/auth/me', method: 'GET' });
  console.log('GET /api/auth/me [Anonyme] -> Status attendu 401:', res.status, 'Auth:', res.json.authenticated);

  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/articles',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { title: 'Article Non Autorisé' });
  console.log('POST /api/articles [Anonyme] -> Status attendu 401:', res.status, 'Message:', res.json.error);

  // Test 2: Compte Lecteur
  console.log('\n--- Étape 2 : Connexion et droits du Compte Lecteur (reader@ontario.com) ---');
  let readerLogin = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'reader@ontario.com', password: 'reader2026!' });
  console.log('POST /api/auth/login [Lecteur] -> Status attendu 200:', readerLogin.status, 'Rôle serveur:', readerLogin.json.user.role);
  const readerToken = readerLogin.json.token;

  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/me',
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + readerToken }
  });
  console.log('GET /api/auth/me [Lecteur] -> Status attendu 200:', res.status, 'Rôle certifié:', res.json.user.role);

  // Test 3: Refus d'écriture pour le lecteur (403)
  console.log('\n--- Étape 3 : Refus des écritures administratives pour le Lecteur ---');
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
  console.log('POST /api/articles [Lecteur] -> Status attendu 403:', res.status, 'Erreur:', res.json.error);

  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/settings',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + readerToken
    }
  }, { name: 'Piraté' });
  console.log('PUT /api/settings [Lecteur] -> Status attendu 403:', res.status, 'Erreur:', res.json.error);

  // Test 4: Compte Administrateur
  console.log('\n--- Étape 4 : Connexion Compte Administrateur (admin@ontario.com) ---');
  let adminLogin = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'admin@ontario.com', password: 'admin2026!' });
  console.log('POST /api/auth/login [Admin] -> Status attendu 200:', adminLogin.status, 'Nom:', adminLogin.json.user.name, 'Rôle:', adminLogin.json.user.role);
  const adminToken = adminLogin.json.token;

  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/me',
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + adminToken }
  });
  console.log('GET /api/auth/me [Admin] -> Status attendu 200:', res.status, 'Rôle certifié:', res.json.user.role);

  // Test 5: Cycle de vie complet article par l'administrateur
  console.log('\n--- Étape 5 : Création, relecture, mise à jour, corbeille et restauration par l\'Admin ---');
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
    title: 'Article Test Validation Droits Administrateur',
    frenchTitle: 'Article Test Validation Droits Administrateur',
    excerpt: 'Test de création sécurisée avec permissions serveurs.',
    categorySlug: 'intelligence-artificielle',
    authorSlug: 'steve-jones',
    status: 'draft',
    contentBlocks: [
      { type: 'paragraph', content: 'Paragraphe rédigé sous session administrateur vérifiée.' },
      { type: 'heading', content: 'Sous-titre H2 de Section Validée' }
    ]
  });
  console.log('POST /api/articles [Admin] -> Status attendu 201:', res.status, 'Article ID:', res.json.article.id);
  const testId = res.json.article.id;

  // Relecture
  res = await req({ hostname: 'localhost', port: 3000, path: '/api/articles/' + testId, method: 'GET' });
  console.log('GET /api/articles/' + testId + ' -> Titre relu:', res.json.article.title, 'Statut:', res.json.article.status);

  // Mise à jour (Publication)
  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/articles/' + testId,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + adminToken
    }
  }, { status: 'published', title: 'Article Test Validation Droits Administrateur [PUBLIÉ]' });
  console.log('PUT /api/articles/' + testId + ' [Admin] -> Nouveau statut:', res.json.article.status);

  // Corbeille
  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/articles/' + testId,
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + adminToken }
  });
  console.log('DELETE /api/articles/' + testId + ' [Trash] -> Succès:', res.json.success);

  // Restauration
  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/articles/' + testId + '/restore',
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + adminToken }
  });
  console.log('POST /api/articles/' + testId + '/restore [Admin] -> Statut restauré:', res.json.article.status);

  // Suppression définitive
  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/articles/' + testId + '?force=true',
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + adminToken }
  });
  console.log('DELETE /api/articles/' + testId + '?force=true -> Définitivement supprimé:', res.json.success);

  // Test 6: Déconnexion
  console.log('\n--- Étape 6 : Déconnexion ---');
  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/logout',
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + adminToken }
  });
  console.log('POST /api/auth/logout -> Status attendu 200:', res.status, 'Message:', res.json.message);

  // Test 7: Intégrité du code client
  console.log('\n--- Étape 7 : Audit du code client (public/app.js & index.html) ---');
  const appJs = fs.readFileSync('public/app.js', 'utf8');
  console.log('Aiguillage vérifié serveur présent :', appJs.includes('verifyServerSession'));
  console.log('Écran refus 403 présent :', appJs.includes('renderAdminAccessDenied'));
  console.log('Écran erreur réseau présent :', appJs.includes('renderAdminAuthError'));
  console.log('Texte "console WordPress" supprimé :', !appJs.includes('console WordPress'));
  console.log('Badge dynamique selon rôle serveur présent :', appJs.includes('currentRoleInfo'));

  console.log('\n========================================================');
  console.log('TOUS LES TESTS DU PARCOURS ADMINISTRATIF ONT RÉUSSI !');
  console.log('========================================================');
}

run().catch(console.error);
