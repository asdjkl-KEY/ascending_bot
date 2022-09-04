require('dotenv').config();
const client = require('./modules/client');
const server = require('./utils/server');
const path = require('path');
const handler = require('./modules/handler');
const { setRoot } = require('jesscode-lib');
setRoot(path.join(__dirname, '/databases/'));

//*Load Commands//
handler(path.join(__dirname, '/commands/'));
handler(path.join(__dirname, '/commands/admin/'));
handler(path.join(__dirname, '/commands/currency/'));


server.listen(server.get('port'), () => {
    console.log(`Server listening on port ${server.get('port')}`);
});

client.login(client.properties.token);