const fs = require('fs');
const path = require('path');
const storage = require('../lib/server-storage');

// Extract ARTICLES and CATEGORIES from public/app.js
const appJsPath = path.join(__dirname, '..', 'public', 'app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Parse CATEGORIES
let categories = [];
const catMatch = appJsContent.match(/const CATEGORIES = (\[[\s\S]*?\]);/);
if (catMatch) {
  try {
    categories = eval(catMatch[1]);
  } catch (e) {
    console.error('Error evaluating categories:', e);
  }
}

// Parse ARTICLES
let articles = [];
const artMatch = appJsContent.match(/let ARTICLES = (\[[\s\S]*?\n\]);/);
if (artMatch) {
  try {
    articles = eval(artMatch[1]);
  } catch (e) {
    console.error('Error evaluating articles:', e);
  }
}

console.log(`Trouvé : ${categories.length} catégories, ${articles.length} articles.`);

// Initialiser storage
storage.initializeStorage({
  categories: categories,
  articles: articles
});

console.log('✅ Stockage initialisé avec succès !');
