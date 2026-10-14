const fs = require('fs');

const app = fs.readFileSync('public/app.js', 'utf8');

// Check for common functions that might be referenced
const checkList = [
  'renderAdmin',
  'renderAdminLogin',
  'renderTabDashboard',
  'renderTabArticles',
  'renderTabCategories',
  'renderTabMedia',
  'renderTabComments',
  'renderTabNewsletter',
  'renderTabAdSense',
  'renderTabCarousel',
  'renderTabPages',
  'renderTabTags',
  'renderTabUsers',
  'renderTabSEO',
  'renderTabAnalytics',
  'renderTabSettings',
  'renderGutenbergEditor',
  'renderAbout',
  'renderContact',
  'renderHome',
  'renderArticle',
  'renderCategory',
  'renderReaderPage',
  'initTheme',
  'cycleTheme',
  'applyTheme',
  'setThemePreference',
  'loadServerData',
  'saveArticleToServer',
  'uploadMediaToServer',
  'deleteMediaFromServer',
  'exportSubscribersCSV',
  'deleteSubscriberFromServer',
  'moderateComment'
];

checkList.forEach(fn => {
  const isFound = app.includes(`function ${fn}`) || app.includes(`${fn} =`) || app.includes(`const ${fn}`) || app.includes(`let ${fn}`);
  console.log(`${fn}: ${isFound ? 'OK' : 'MISSING'}`);
});
