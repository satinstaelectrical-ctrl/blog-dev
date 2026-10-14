const fs = require('fs');

const aliasCode = `
// Aliases
const saveArticleToServer = saveArticleWithStatus;
const uploadMediaToServer = triggerMediaUpload;
`;

fs.appendFileSync('public/app.part2_helpers.js', aliasCode, 'utf8');
console.log('Appended aliases to app.part2_helpers.js');
