const fs = require('fs');
const users = JSON.parse(fs.readFileSync('data/storage/users.json', 'utf8'));
console.log(JSON.stringify(users, null, 2));
