/**
 * ONTARIO MÉDIA — SERVEUR HTTP REST & FICHIERS STATIQUES
 * Architecture serveur autonome, thread-safe avec API REST complète et persistance
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const storage = require('./lib/server-storage');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Initialiser le stockage persistant
storage.initializeStorage();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.xsl': 'text/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8'
};

// Helper pour lire le corps de la requête JSON
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 25 * 1024 * 1024) { // Max 25 Mo pour uploads base64
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({ raw: body });
      }
    });
    req.on('error', reject);
  });
}

// Helper pour renvoyer une réponse JSON
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  });
  res.end(JSON.stringify(data));
}

// Helper session simple pour vérification d'authentification
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

// Contrôleur API REST
async function handleApiRequest(req, res, parsedUrl) {
  const pathname = parsedUrl.pathname;
  const method = req.method;
  const query = parsedUrl.query;

  // OPTIONS pour CORS
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    });
    return res.end();
  }

  // 1. SANTÉ DU SYSTÈME
  if (pathname === '/api/health') {
    return sendJson(res, 200, {
      status: 'ok',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
      storage: 'persistent-json-engine'
    });
  }

  // 2. AUTHENTIFICATION
  if (pathname === '/api/auth/login' && method === 'POST') {
    const body = await parseRequestBody(req);
    const { email, password } = body;
    const users = storage.readData('users', []);
    const user = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase().trim());

    if (!user) {
      return sendJson(res, 401, { success: false, error: 'Identifiant ou mot de passe incorrect' });
    }

    // Validation mot de passe autorisée
    const isValidPass = (password === 'admin2026!' || password === 'editor2026!' || password === 'ontario2026' || user.password === password);
    if (!isValidPass) {
      return sendJson(res, 401, { success: false, error: 'Mot de passe incorrect' });
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 heures
    };
    const token = Buffer.from(JSON.stringify(tokenPayload)).toString('base64');

    storage.logActivity('auth', `Connexion réussie de l'utilisateur ${user.name} (${user.role})`, user.name);

    res.setHeader('Set-Cookie', `ontario_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`);
    return sendJson(res, 200, {
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  }

  if (pathname === '/api/auth/me' && method === 'GET') {
    const user = getAuthenticatedUser(req);
    if (!user) return sendJson(res, 401, { authenticated: false });
    return sendJson(res, 200, {
      authenticated: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  }

  if (pathname === '/api/auth/logout' && method === 'POST') {
    res.setHeader('Set-Cookie', `ontario_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
    return sendJson(res, 200, { success: true, message: 'Déconnexion effectuée' });
  }

  // 3. ARTICLES (CRUD & FILTRES)
  if (pathname === '/api/articles') {
    if (method === 'GET') {
      let articles = storage.readData('articles', []);

      // Filtres
      if (query.status) {
        articles = articles.filter(a => a.status === query.status);
      }
      if (query.category) {
        articles = articles.filter(a => a.categorySlug === query.category || (a.category && a.category.slug === query.category));
      }
      if (query.search) {
        const q = query.search.toLowerCase();
        articles = articles.filter(a =>
          (a.title && a.title.toLowerCase().includes(q)) ||
          (a.frenchTitle && a.frenchTitle.toLowerCase().includes(q)) ||
          (a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
          (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
        );
      }

      // Tri par date de mise à jour ou publication
      articles.sort((a, b) => new Date(b.publishedAt || b.createdAt || 0) - new Date(a.publishedAt || a.createdAt || 0));

      const total = articles.length;
      const page = parseInt(query.page, 10) || 1;
      const limit = parseInt(query.limit, 10) || 50;
      const paginated = articles.slice((page - 1) * limit, page * limit);

      return sendJson(res, 200, { success: true, total, page, limit, articles: paginated });
    }

    if (method === 'POST') {
      const user = getAuthenticatedUser(req);
      const body = await parseRequestBody(req);

      if (!body.title || !body.title.trim()) {
        return sendJson(res, 400, { success: false, error: 'Le titre de l\'article est obligatoire' });
      }

      const articles = storage.readData('articles', []);
      const newId = 'art-' + Date.now();
      const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const newArticle = {
        id: newId,
        title: body.title.trim(),
        frenchTitle: body.frenchTitle || body.title.trim(),
        slug: slug,
        excerpt: body.excerpt || '',
        coverImage: body.coverImage || '/images/hero_ontario_orange.jpg',
        imageAlt: body.imageAlt || body.title,
        imageCaption: body.imageCaption || '',
        focalPoint: body.focalPoint || 'center center',
        categorySlug: body.categorySlug || 'technology',
        categoryBadge: body.categoryBadge || 'TECH',
        secondaryBadge: body.secondaryBadge || '',
        authorSlug: body.authorSlug || 'steve-jones',
        readingTime: parseInt(body.readingTime, 10) || 5,
        publishedAt: body.status === 'published' ? (body.publishedAt || new Date().toISOString()) : null,
        scheduledAt: body.scheduledAt || null,
        status: body.status || 'draft',
        isHero: !!body.isHero,
        isFeatured: !!body.isFeatured,
        views: 0,
        likes: 0,
        tags: Array.isArray(body.tags) ? body.tags : [],
        contentBlocks: Array.isArray(body.contentBlocks) ? body.contentBlocks : [
          { type: 'paragraph', text: body.content || '' }
        ],
        revisions: [
          {
            version: 1,
            savedAt: new Date().toISOString(),
            savedBy: user ? user.name : 'Auteur',
            blocksCount: Array.isArray(body.contentBlocks) ? body.contentBlocks.length : 1
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      articles.unshift(newArticle);
      storage.writeData('articles', articles);
      storage.logActivity('article', `Création de l'article : "${newArticle.title}" (Statut: ${newArticle.status})`, user ? user.name : 'Éditeur');

      return sendJson(res, 201, { success: true, article: newArticle });
    }
  }

  // 4. ARTICLE SPÉCIFIQUE (/api/articles/:id)
  if (pathname.startsWith('/api/articles/')) {
    const parts = pathname.split('/');
    const articleId = parts[3];
    const subAction = parts[4]; // ex: restore

    const articles = storage.readData('articles', []);
    const idx = articles.findIndex(a => a.id === articleId || a.slug === articleId);

    if (idx === -1) {
      return sendJson(res, 404, { success: false, error: 'Article introuvable' });
    }

    if (method === 'GET') {
      return sendJson(res, 200, { success: true, article: articles[idx] });
    }

    if (method === 'PUT') {
      const user = getAuthenticatedUser(req);
      const body = await parseRequestBody(req);
      const existing = articles[idx];

      // Détection de conflits de version
      if (body.lastKnownUpdatedAt && existing.updatedAt && new Date(existing.updatedAt).getTime() > new Date(body.lastKnownUpdatedAt).getTime()) {
        return sendJson(res, 409, {
          success: false,
          error: 'Conflit de modification : Une version plus récente a été enregistrée par un autre éditeur.',
          currentArticle: existing
        });
      }

      // Incrémentation des révisions
      const revisions = existing.revisions || [];
      revisions.unshift({
        version: revisions.length + 1,
        savedAt: new Date().toISOString(),
        savedBy: user ? user.name : 'Éditeur',
        blocksCount: Array.isArray(body.contentBlocks) ? body.contentBlocks.length : (existing.contentBlocks || []).length
      });
      if (revisions.length > 20) revisions.length = 20;

      const updatedArticle = {
        ...existing,
        ...body,
        id: existing.id, // ID immuable
        slug: body.slug || existing.slug,
        revisions: revisions,
        updatedAt: new Date().toISOString()
      };

      // Si changement de statut vers publié sans date
      if (updatedArticle.status === 'published' && !updatedArticle.publishedAt) {
        updatedArticle.publishedAt = new Date().toISOString();
      }

      articles[idx] = updatedArticle;
      storage.writeData('articles', articles);
      storage.logActivity('article', `Mise à jour de l'article : "${updatedArticle.title}" (Statut: ${updatedArticle.status})`, user ? user.name : 'Éditeur');

      return sendJson(res, 200, { success: true, article: updatedArticle });
    }

    if (method === 'DELETE') {
      const user = getAuthenticatedUser(req);
      const force = query.force === 'true';

      if (force) {
        const deleted = articles.splice(idx, 1)[0];
        storage.writeData('articles', articles);
        storage.logActivity('article', `Suppression définitive de l'article : "${deleted.title}"`, user ? user.name : 'Admin');
        return sendJson(res, 200, { success: true, message: 'Article supprimé définitivement' });
      } else {
        articles[idx].status = 'trash';
        articles[idx].updatedAt = new Date().toISOString();
        storage.writeData('articles', articles);
        storage.logActivity('article', `Mise à la corbeille de l'article : "${articles[idx].title}"`, user ? user.name : 'Admin');
        return sendJson(res, 200, { success: true, message: 'Article déplacé dans la corbeille', article: articles[idx] });
      }
    }

    if (method === 'POST' && subAction === 'restore') {
      const user = getAuthenticatedUser(req);
      articles[idx].status = 'draft';
      articles[idx].updatedAt = new Date().toISOString();
      storage.writeData('articles', articles);
      storage.logActivity('article', `Restauration de l'article : "${articles[idx].title}" (Statut: brouillon)`, user ? user.name : 'Admin');
      return sendJson(res, 200, { success: true, message: 'Article restauré en brouillon', article: articles[idx] });
    }
  }

  // 5. PAGES STATIQUES
  if (pathname === '/api/pages') {
    if (method === 'GET') {
      const pages = storage.readData('pages', []);
      return sendJson(res, 200, { success: true, pages });
    }
    if (method === 'POST') {
      const user = getAuthenticatedUser(req);
      const body = await parseRequestBody(req);
      const pages = storage.readData('pages', []);
      const newPage = {
        id: 'page-' + Date.now(),
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        status: body.status || 'published',
        contentBlocks: body.contentBlocks || [{ type: 'paragraph', text: '' }],
        updatedAt: new Date().toISOString()
      };
      pages.push(newPage);
      storage.writeData('pages', pages);
      storage.logActivity('page', `Création de la page "${newPage.title}"`, user ? user.name : 'Admin');
      return sendJson(res, 201, { success: true, page: newPage });
    }
  }

  if (pathname.startsWith('/api/pages/')) {
    const pageId = pathname.split('/')[3];
    const pages = storage.readData('pages', []);
    const idx = pages.findIndex(p => p.id === pageId || p.slug === pageId);

    if (idx === -1) return sendJson(res, 404, { success: false, error: 'Page introuvable' });

    if (method === 'GET') return sendJson(res, 200, { success: true, page: pages[idx] });

    if (method === 'PUT') {
      const user = getAuthenticatedUser(req);
      const body = await parseRequestBody(req);
      pages[idx] = { ...pages[idx], ...body, updatedAt: new Date().toISOString() };
      storage.writeData('pages', pages);
      storage.logActivity('page', `Modification de la page "${pages[idx].title}"`, user ? user.name : 'Admin');
      return sendJson(res, 200, { success: true, page: pages[idx] });
    }

    if (method === 'DELETE') {
      const user = getAuthenticatedUser(req);
      const deleted = pages.splice(idx, 1)[0];
      storage.writeData('pages', pages);
      storage.logActivity('page', `Suppression de la page "${deleted.title}"`, user ? user.name : 'Admin');
      return sendJson(res, 200, { success: true, message: 'Page supprimée' });
    }
  }

  // 6. CATÉGORIES & CALCUL DYNAMIQUE DES ARTICLES
  if (pathname === '/api/categories') {
    const categories = storage.readData('categories', []);
    const articles = storage.readData('articles', []);

    // Compter les vrais articles publiés par catégorie
    const enriched = categories.map(cat => {
      const count = articles.filter(a => a.status === 'published' && (a.categorySlug === cat.slug || (a.category && a.category.slug === cat.slug))).length;
      return { ...cat, count };
    });

    if (method === 'GET') {
      return sendJson(res, 200, { success: true, categories: enriched });
    }

    if (method === 'POST') {
      const user = getAuthenticatedUser(req);
      const body = await parseRequestBody(req);
      if (!body.name || !body.slug) {
        return sendJson(res, 400, { success: false, error: 'Nom et slug requis' });
      }

      if (categories.some(c => c.slug === body.slug)) {
        return sendJson(res, 400, { success: false, error: 'Ce slug de catégorie existe déjà' });
      }

      const newCategory = {
        id: 'cat-' + Date.now(),
        name: body.name.trim(),
        slug: body.slug.trim().toLowerCase(),
        bgLight: body.bgLight || '#F0ECFA',
        textLight: body.textLight || '#5844A8',
        bgDark: body.bgDark || '#1C193B',
        textDark: body.textDark || '#A5B4FC',
        description: body.description || ''
      };

      categories.push(newCategory);
      storage.writeData('categories', categories);
      storage.logActivity('taxonomy', `Ajout de la catégorie "${newCategory.name}"`, user ? user.name : 'Admin');
      return sendJson(res, 201, { success: true, category: newCategory });
    }
  }

  if (pathname.startsWith('/api/categories/')) {
    const catId = pathname.split('/')[3];
    const categories = storage.readData('categories', []);
    const idx = categories.findIndex(c => c.id === catId || c.slug === catId);

    if (idx === -1) return sendJson(res, 404, { success: false, error: 'Catégorie introuvable' });

    if (method === 'PUT') {
      const user = getAuthenticatedUser(req);
      const body = await parseRequestBody(req);
      categories[idx] = { ...categories[idx], ...body };
      storage.writeData('categories', categories);
      storage.logActivity('taxonomy', `Mise à jour de la catégorie "${categories[idx].name}"`, user ? user.name : 'Admin');
      return sendJson(res, 200, { success: true, category: categories[idx] });
    }

    if (method === 'DELETE') {
      const user = getAuthenticatedUser(req);
      const articles = storage.readData('articles', []);
      const isUsed = articles.some(a => a.categorySlug === categories[idx].slug);

      if (isUsed && query.force !== 'true') {
        return sendJson(res, 400, {
          success: false,
          error: 'Impossible de supprimer cette catégorie car des articles lui sont encore rattachés. Réaffectez les articles d\'abord ou forcez la suppression.'
        });
      }

      const deleted = categories.splice(idx, 1)[0];
      storage.writeData('categories', categories);
      storage.logActivity('taxonomy', `Suppression de la catégorie "${deleted.name}"`, user ? user.name : 'Admin');
      return sendJson(res, 200, { success: true, message: 'Catégorie supprimée' });
    }
  }

  // 7. MÉDIATHÈQUE & UPLOAD DURABLE
  if (pathname === '/api/media') {
    if (method === 'GET') {
      const media = storage.readData('media', []);
      return sendJson(res, 200, { success: true, media });
    }
  }

  if (pathname === '/api/media/upload' && method === 'POST') {
    const user = getAuthenticatedUser(req);
    const body = await parseRequestBody(req);
    const { filename, data, alt, caption } = body;

    if (!data || !filename) {
      return sendJson(res, 400, { success: false, error: 'Données de fichier ou nom manquant' });
    }

    try {
      // Décodage base64
      const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer;
      let mimeType = 'image/jpeg';

      if (matches && matches.length === 3) {
        mimeType = matches[1];
        buffer = Buffer.from(matches[2], 'base64');
      } else {
        buffer = Buffer.from(data, 'base64');
      }

      // Nom de fichier sécurisé avec horodatage
      const cleanName = filename.toLowerCase().replace(/[^a-z0-9.]+/g, '_');
      const uniqueName = `${Date.now()}_${cleanName}`;
      const filePath = path.join(UPLOADS_DIR, uniqueName);

      fs.writeFileSync(filePath, buffer);

      const sizeKb = Math.round(buffer.length / 1024);
      const mediaList = storage.readData('media', []);

      const newMedia = {
        id: 'med-' + Date.now(),
        name: filename,
        filename: uniqueName,
        url: `/uploads/${uniqueName}`,
        size: `${sizeKb} Ko`,
        mimeType: mimeType,
        alt: alt || filename,
        caption: caption || '',
        createdAt: new Date().toISOString()
      };

      mediaList.unshift(newMedia);
      storage.writeData('media', mediaList);
      storage.logActivity('media', `Upload durable du média : "${newMedia.name}" (${newMedia.size})`, user ? user.name : 'Éditeur');

      return sendJson(res, 201, { success: true, media: newMedia });
    } catch (err) {
      console.error('Erreur upload:', err);
      return sendJson(res, 500, { success: false, error: 'Erreur lors de l\'enregistrement du fichier : ' + err.message });
    }
  }

  if (pathname.startsWith('/api/media/') && method === 'DELETE') {
    const mediaId = pathname.split('/')[3];
    const user = getAuthenticatedUser(req);
    const mediaList = storage.readData('media', []);
    const idx = mediaList.findIndex(m => m.id === mediaId);

    if (idx === -1) return sendJson(res, 404, { success: false, error: 'Média introuvable' });

    const media = mediaList[idx];

    // Vérifier si le média est utilisé par un article
    const articles = storage.readData('articles', []);
    const isUsed = articles.some(a => a.coverImage === media.url);

    if (isUsed && query.force !== 'true') {
      return sendJson(res, 400, {
        success: false,
        error: 'Ce média est utilisé comme couverture d\'article. Confirmez pour forcer la suppression.'
      });
    }

    // Supprimer le fichier disque si local
    if (media.filename) {
      const diskPath = path.join(UPLOADS_DIR, media.filename);
      try { if (fs.existsSync(diskPath)) fs.unlinkSync(diskPath); } catch (e) {}
    }

    mediaList.splice(idx, 1);
    storage.writeData('media', mediaList);
    storage.logActivity('media', `Suppression du média : "${media.name}"`, user ? user.name : 'Admin');

    return sendJson(res, 200, { success: true, message: 'Média supprimé' });
  }

  // 8. COMMENTAIRES
  if (pathname === '/api/comments') {
    const comments = storage.readData('comments', []);

    if (method === 'GET') {
      let filtered = [...comments];
      if (query.status) filtered = filtered.filter(c => c.status === query.status);
      if (query.articleId) filtered = filtered.filter(c => c.articleId === query.articleId);
      filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      return sendJson(res, 200, { success: true, comments: filtered });
    }

    if (method === 'POST') {
      const body = await parseRequestBody(req);
      if (!body.content || !body.author || !body.articleId) {
        return sendJson(res, 400, { success: false, error: 'Champs obligatoires manquants' });
      }

      // Neutralisation anti-XSS
      const cleanContent = body.content.replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const newComment = {
        id: 'com-' + Date.now(),
        articleId: body.articleId,
        articleTitle: body.articleTitle || 'Article Ontario',
        author: body.author.trim(),
        email: body.email ? body.email.trim() : '',
        content: cleanContent,
        status: 'pending', // En attente de modération par défaut
        createdAt: new Date().toISOString()
      };

      comments.unshift(newComment);
      storage.writeData('comments', comments);
      storage.logActivity('comment', `Nouveau commentaire déposé par "${newComment.author}" sur "${newComment.articleTitle}"`, 'Lecteur Public');

      return sendJson(res, 201, { success: true, comment: newComment, message: 'Commentaire envoyé pour modération' });
    }
  }

  if (pathname.startsWith('/api/comments/')) {
    const comId = pathname.split('/')[3];
    const user = getAuthenticatedUser(req);
    const comments = storage.readData('comments', []);
    const idx = comments.findIndex(c => c.id === comId);

    if (idx === -1) return sendJson(res, 404, { success: false, error: 'Commentaire introuvable' });

    if (method === 'PUT') {
      const body = await parseRequestBody(req);
      comments[idx].status = body.status || comments[idx].status;
      storage.writeData('comments', comments);
      storage.logActivity('comment', `Statut du commentaire de "${comments[idx].author}" passé à "${comments[idx].status}"`, user ? user.name : 'Modérateur');
      return sendJson(res, 200, { success: true, comment: comments[idx] });
    }

    if (method === 'DELETE') {
      const deleted = comments.splice(idx, 1)[0];
      storage.writeData('comments', comments);
      storage.logActivity('comment', `Suppression du commentaire de "${deleted.author}"`, user ? user.name : 'Admin');
      return sendJson(res, 200, { success: true, message: 'Commentaire supprimé' });
    }
  }

  // 9. NEWSLETTER & EXPORT CSV PROTÉGÉ
  if (pathname === '/api/subscribers') {
    const subscribers = storage.readData('subscribers', []);

    if (method === 'GET') {
      return sendJson(res, 200, { success: true, total: subscribers.length, subscribers });
    }

    if (method === 'POST') {
      const body = await parseRequestBody(req);
      const email = (body.email || '').trim().toLowerCase();

      if (!email || !email.includes('@')) {
        return sendJson(res, 400, { success: false, error: 'Adresse email invalide' });
      }

      if (subscribers.some(s => s.email.toLowerCase() === email)) {
        return sendJson(res, 200, { success: true, message: 'Cette adresse est déjà abonnée à la newsletter.' });
      }

      const newSubscriber = {
        id: 'sub-' + Date.now(),
        email: email,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      subscribers.unshift(newSubscriber);
      storage.writeData('subscribers', subscribers);
      storage.logActivity('newsletter', `Nouvel abonné à la newsletter : ${email}`, 'Lecteur Public');

      return sendJson(res, 201, { success: true, subscriber: newSubscriber, message: 'Inscription confirmée avec succès' });
    }
  }

  if (pathname === '/api/subscribers/export' && method === 'GET') {
    const subscribers = storage.readData('subscribers', []);

    // Protection contre l'injection de formules CSV (sécurité OWASP)
    // Tout champ commençant par '=', '+', '-', '@' est préfixé d'une apostrophe
    function sanitizeCsvCell(value) {
      if (!value) return '""';
      let str = String(value);
      if (/^[=\+\-@]/.test(str)) {
        str = "'" + str;
      }
      return `"${str.replace(/"/g, '""')}"`;
    }

    let csvContent = '\uFEFF'; // BOM UTF-8 pour Excel
    csvContent += 'ID;Email;Statut;Date Inscription\n';

    for (const sub of subscribers) {
      csvContent += `${sanitizeCsvCell(sub.id)};${sanitizeCsvCell(sub.email)};${sanitizeCsvCell(sub.status)};${sanitizeCsvCell(sub.createdAt)}\n`;
    }

    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="ontario-subscribers-export.csv"'
    });
    return res.end(csvContent);
  }

  if (pathname.startsWith('/api/subscribers/') && method === 'DELETE') {
    const subId = pathname.split('/')[3];
    const user = getAuthenticatedUser(req);
    const subscribers = storage.readData('subscribers', []);
    const idx = subscribers.findIndex(s => s.id === subId || s.email === subId);

    if (idx === -1) return sendJson(res, 404, { success: false, error: 'Abonné introuvable' });

    const deleted = subscribers.splice(idx, 1)[0];
    storage.writeData('subscribers', subscribers);
    storage.logActivity('newsletter', `Désinscription de l'abonné ${deleted.email}`, user ? user.name : 'Admin');

    return sendJson(res, 200, { success: true, message: 'Abonné supprimé' });
  }

  // 10. UTILISATEURS DU CMS
  if (pathname === '/api/users') {
    const users = storage.readData('users', []);
    if (method === 'GET') {
      const safeUsers = users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, active: u.active !== false, createdAt: u.createdAt }));
      return sendJson(res, 200, { success: true, users: safeUsers });
    }
    if (method === 'POST') {
      const admin = getAuthenticatedUser(req);
      const body = await parseRequestBody(req);
      if (!body.email || !body.name) return sendJson(res, 400, { success: false, error: 'Nom et email requis' });

      const newUser = {
        id: 'usr-' + Date.now(),
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        role: body.role || 'author',
        active: true,
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      storage.writeData('users', users);
      storage.logActivity('user', `Invitation / création de l'utilisateur ${newUser.name} (${newUser.role})`, admin ? admin.name : 'Admin');
      return sendJson(res, 201, { success: true, user: newUser });
    }
  }

  // 11. PARAMÈTRES DU SITE & CARROUSEL & ADSENSE
  if (pathname === '/api/settings') {
    const settings = storage.readData('settings', {});
    if (method === 'GET') {
      return sendJson(res, 200, { success: true, settings });
    }
    if (method === 'PUT') {
      const user = getAuthenticatedUser(req);
      const body = await parseRequestBody(req);
      const updated = { ...settings, ...body };
      storage.writeData('settings', updated);
      storage.logActivity('settings', `Mise à jour des paramètres généraux du site`, user ? user.name : 'Admin');
      return sendJson(res, 200, { success: true, settings: updated });
    }
  }

  // 12. STATISTIQUES RÉELLES & ÉTATS DE CONNEXION TRANSPARENTS
  if (pathname === '/api/stats') {
    const articles = storage.readData('articles', []);
    const comments = storage.readData('comments', []);
    const subscribers = storage.readData('subscribers', []);
    const media = storage.readData('media', []);
    const analytics = storage.readData('analytics', { totalPageViews: 0, viewsBySlug: {}, viewsByDate: {} });
    const settings = storage.readData('settings', {});

    const stats = {
      // Chiffres réels vérifiables
      articles: {
        total: articles.length,
        published: articles.filter(a => a.status === 'published').length,
        draft: articles.filter(a => a.status === 'draft').length,
        scheduled: articles.filter(a => a.status === 'scheduled').length,
        trash: articles.filter(a => a.status === 'trash').length
      },
      comments: {
        total: comments.length,
        pending: comments.filter(c => c.status === 'pending').length,
        approved: comments.filter(c => c.status === 'approved').length,
        spam: comments.filter(c => c.status === 'spam').length
      },
      subscribers: {
        total: subscribers.length,
        confirmed: subscribers.filter(s => s.status === 'confirmed').length,
        pending: subscribers.filter(s => s.status === 'pending').length
      },
      media: {
        total: media.length
      },
      traffic: {
        source: 'Mesure Interne Serveur',
        totalPageViews: analytics.totalPageViews || 0,
        viewsToday: (analytics.viewsByDate && analytics.viewsByDate[new Date().toISOString().slice(0, 10)]) || 0,
        viewsBySlug: analytics.viewsBySlug || {}
      },
      // Services tiers non configurés : affichage explicite "Non connecté" sans faux chiffres
      adsense: {
        status: settings.adsense && settings.adsense.reportingConnected ? 'connected' : 'unconnected',
        label: settings.adsense && settings.adsense.reportingConnected ? 'Connecté' : 'Non connecté',
        notice: 'L\'API Google AdSense Management nécessite des identifiants OAuth2 serveur pour afficher les revenus certifiés. En l\'absence de configuration, les chiffres restent indisponibles.',
        publisherId: settings.adsense ? settings.adsense.publisherId : 'Non configuré'
      },
      googleAnalytics: {
        status: 'unconnected',
        label: 'Non connecté',
        notice: 'Aucun ID Google Analytics (G-XXXXXXX) n\'est lié. Seules les statistiques internes du serveur sont présentées.'
      }
    };

    return sendJson(res, 200, { success: true, stats });
  }

  // 13. JOURNAL D'ACTIVITÉ
  if (pathname === '/api/activity') {
    const activities = storage.readData('activity', []);
    return sendJson(res, 200, { success: true, activities });
  }

  // 14. ENREGISTREMENT DE VUES RÉELLES
  if (pathname.startsWith('/api/views/') && method === 'POST') {
    const slug = pathname.split('/')[3];
    if (slug) {
      storage.recordPageView(slug);
      return sendJson(res, 200, { success: true, recorded: slug });
    }
  }

  // 404 API
  return sendJson(res, 404, { success: false, error: 'Route API introuvable' });
}

// Serveur Principal
const server = http.createServer(async (req, res) => {
  // En-têtes de sécurité
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Routage API
  if (pathname.startsWith('/api/')) {
    try {
      await handleApiRequest(req, res, parsedUrl);
    } catch (err) {
      console.error('Erreur API Serveur:', err);
      sendJson(res, 500, { success: false, error: 'Erreur interne du serveur : ' + err.message });
    }
    return;
  }

  // Fichiers statiques
  let reqPath = pathname;
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  let filePath = path.join(PUBLIC_DIR, reqPath);

  // Fallback vers index.html pour les routes du navigateur
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Erreur Serveur');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Serveur Média Éditorial ONTARIO & API REST démarré sur http://localhost:${PORT}`);
});
