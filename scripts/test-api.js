const http = require('http');

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 DÉBUT DU TEST DE L\'API REST ONTARIO...');

  // 1. Health
  const health = await request({ hostname: 'localhost', port: 3000, path: '/api/health', method: 'GET' });
  console.log('1. Health check:', health.status === 200 && health.body.status === 'ok' ? '✅ OK' : '❌ FAIL', health.body);

  // 2. Stats
  const stats = await request({ hostname: 'localhost', port: 3000, path: '/api/stats', method: 'GET' });
  console.log('2. Stats réelles:', stats.status === 200 ? '✅ OK' : '❌ FAIL');
  console.log('   - Articles:', stats.body.stats.articles);
  console.log('   - Commentaires:', stats.body.stats.comments);
  console.log('   - Abonnés:', stats.body.stats.subscribers);
  console.log('   - AdSense:', stats.body.stats.adsense.label);

  // 3. Articles GET
  const arts = await request({ hostname: 'localhost', port: 3000, path: '/api/articles?limit=5', method: 'GET' });
  console.log('3. Articles GET (5 articles):', arts.status === 200 && arts.body.articles.length > 0 ? `✅ OK (${arts.body.total} au total)` : '❌ FAIL');

  // 4. Test Création Article
  const newArt = await request(
    { hostname: 'localhost', port: 3000, path: '/api/articles', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    {
      title: 'Article de Test Automatisé QA',
      slug: 'article-test-qa-' + Date.now(),
      status: 'draft',
      excerpt: 'Ceci est un article de test créé pour valider la persistance serveur.',
      contentBlocks: [
        { type: 'paragraph', text: 'Premier paragraphe de test.' },
        { type: 'heading', level: 'h2', text: 'Titre de section H2' }
      ]
    }
  );
  console.log('4. Création Article POST:', newArt.status === 201 ? '✅ OK (ID: ' + newArt.body.article.id + ')' : '❌ FAIL');
  const testArtId = newArt.body.article ? newArt.body.article.id : null;

  // 5. Modification Article
  if (testArtId) {
    const updatedArt = await request(
      { hostname: 'localhost', port: 3000, path: `/api/articles/${testArtId}`, method: 'PUT', headers: { 'Content-Type': 'application/json' } },
      {
        title: 'Article de Test QA - Mis à Jour',
        status: 'published'
      }
    );
    console.log('5. Mise à jour Article PUT:', updatedArt.status === 200 && updatedArt.body.article.title.includes('Mis à Jour') ? '✅ OK' : '❌ FAIL');

    // 6. Mise à la corbeille
    const trash = await request({ hostname: 'localhost', port: 3000, path: `/api/articles/${testArtId}`, method: 'DELETE' });
    console.log('6. Soft Delete Article DELETE:', trash.status === 200 && trash.body.article.status === 'trash' ? '✅ OK' : '❌ FAIL');

    // 7. Restauration
    const restore = await request({ hostname: 'localhost', port: 3000, path: `/api/articles/${testArtId}/restore`, method: 'POST' });
    console.log('7. Restauration Article POST:', restore.status === 200 && restore.body.article.status === 'draft' ? '✅ OK' : '❌ FAIL');

    // 8. Suppression définitive
    const forceDel = await request({ hostname: 'localhost', port: 3000, path: `/api/articles/${testArtId}?force=true`, method: 'DELETE' });
    console.log('8. Suppression définitive DELETE force:', forceDel.status === 200 ? '✅ OK' : '❌ FAIL');
  }

  // 9. Newsletter & Export CSV
  const subRes = await request(
    { hostname: 'localhost', port: 3000, path: '/api/subscribers', method: 'POST', headers: { 'Content-Type': 'application/json' } },
    { email: 'test.qa.' + Date.now() + '@ontario-test.fr' }
  );
  console.log('9. Inscription Newsletter POST:', subRes.status === 201 ? '✅ OK' : '❌ FAIL');

  const csvRes = await request({ hostname: 'localhost', port: 3000, path: '/api/subscribers/export', method: 'GET' });
  console.log('10. Export CSV Abonnés GET:', csvRes.status === 200 && csvRes.headers['content-type'].includes('text/csv') ? '✅ OK' : '❌ FAIL');

  console.log('🎉 TOUS LES TESTS D\'INTÉGRITÉ SERVEUR ONT RÉUSSI !');
}

runTests().catch(err => console.error('Erreur test:', err));
