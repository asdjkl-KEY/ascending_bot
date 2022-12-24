require('dotenv').config();
require('colors');
const { client } = require('./modules/client');
const server = require('./utils/server');
const path = require('path');
const handler = require('./modules/handler');
// const slashHandler = require('./modules/slashHandler');
const { setRoot } = require('jesscode-lib');
setRoot(path.join(__dirname, '/databases/'));

//*Load Commands//
handler(path.join(__dirname, '/commands/'));
handler(path.join(__dirname, '/commands/bedrock/'));
handler(path.join(__dirname, '/commands/admin/'));
handler(path.join(__dirname, '/commands/diversion/'));
handler(path.join(__dirname, '/commands/utils/'));
handler(path.join(__dirname, '/commands/owner/'));
handler(path.join(__dirname, '/commands/currency/'));
// slashHandler.run();
// //if client not logged in, log in
// if (!client.ws.shards.get(0).status === 0) client.login(process.env['TOKEN']);
// if (!client.ws.shards.get(0).status === 0) client.login(process.env['TOKEN']);
// if (!client.ws.shards.get(0).status === 0) client.login(process.env['TOKEN']);

client.login(process.env['TOKEN']);
client.login(process.env['TOKEN']);
client.login(process.env['TOKEN']);
server.listen(server.get('port'), () => {
    console.log(`Server listening on port ${server.get('port')}`);
});
