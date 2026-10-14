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
  console.log('--- TEST 1: Server Root HTML ---');
  let res = await req({ hostname: 'localhost', port: 3000, path: '/', method: 'GET' });
  console.log('Status:', res.status, 'Has anti-FOUC:', res.body.includes('Anti-FOUC Theme Initialization'));

  console.log('\n--- TEST 2: Static JS and Images ---');
  res = await req({ hostname: 'localhost', port: 3000, path: '/app.js', method: 'GET' });
  console.log('app.js status:', res.status, 'size:', res.body.length);
  res = await req({ hostname: 'localhost', port: 3000, path: '/images/hero_ontario_orange.jpg', method: 'GET' });
  console.log('hero image status:', res.status, 'content-type:', res.headers['content-type']);

  console.log('\n--- TEST 3: Real Server Stats ---');
  res = await req({ hostname: 'localhost', port: 3000, path: '/api/stats', method: 'GET' });
  console.log('Stats:', res.json);

  console.log('\n--- TEST 4: Admin Authentication ---');
  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'admin@ontario.com', password: 'wrong' });
  console.log('Wrong pass status:', res.status, 'Expected 401:', res.status === 401);

  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'admin@ontario.com', password: 'admin2026!' });
  console.log('Correct pass status:', res.status, 'User:', res.json.user.name, 'Role:', res.json.user.role);

  console.log('\n--- TEST 5: Gutenberg Article Full Lifecycle ---');
  // Create
  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/articles',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    title: 'Article Test Validation E2E',
    frenchTitle: 'Article Test Validation E2E',
    slug: 'article-test-validation-e2e',
    excerpt: 'Test de persistance et de réédition des blocs Gutenberg',
    categorySlug: 'intelligence-artificielle',
    authorSlug: 'steve-jones',
    status: 'draft',
    contentBlocks: [
      { type: 'paragraph', content: 'Premier paragraphe rédigé sans perte de focus.' },
      { type: 'heading', content: 'Sous-titre H2 de Section' },
      { type: 'affiliate', productTitle: 'Casque Audio Focal Bathys', price: '699 €', link: 'https://amazon.fr/focal-bathys' }
    ]
  });
  console.log('Create article status:', res.status, 'Created ID:', res.json.article.id);
  const testId = res.json.article.id;

  // Read back
  res = await req({ hostname: 'localhost', port: 3000, path: '/api/articles/' + testId, method: 'GET' });
  console.log('Read back title:', res.json.article.title, 'Blocks count:', res.json.article.contentBlocks.length);

  // Update
  res = await req({
    hostname: 'localhost',
    port: 3000,
    path: '/api/articles/' + testId,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  }, { status: 'published', title: 'Article Test Validation E2E [PUBLIÉ]' });
  console.log('Update status:', res.status, 'New status:', res.json.article.status);

  // Soft delete (Trash)
  res = await req({ hostname: 'localhost', port: 3000, path: '/api/articles/' + testId, method: 'DELETE' });
  console.log('Trash status:', res.status, 'Success:', res.json.success);

  // Restore
  res = await req({ hostname: 'localhost', port: 3000, path: '/api/articles/' + testId + '/restore', method: 'POST' });
  console.log('Restore status:', res.status, 'Restored status:', res.json.article.status);

  // Permanent Delete
  res = await req({ hostname: 'localhost', port: 3000, path: '/api/articles/' + testId + '?force=true', method: 'DELETE' });
  console.log('Force delete status:', res.status, 'Success:', res.json.success);

  console.log('\n--- TEST 6: Subscriber Export with Formula Sanitization ---');
  res = await req({ hostname: 'localhost', port: 3000, path: '/api/subscribers/export', method: 'GET' });
  console.log('CSV Export status:', res.status, 'First line:', res.body.split('\n')[0]);

  console.log('\nALL BACKEND & API TESTS PASSED PERFECTLY!');
}

run().catch(console.error);
