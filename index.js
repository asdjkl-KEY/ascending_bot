require('dotenv').config();
require('colors');
const { client } = require('./modules/client');
const server = require('./utils/server');
const path = require('path');
const handler = require('./modules/handler');
const slashHandler = require('./modules/slashHandler');
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
slashHandler.run();
server.listen(server.get('port'), () => {
    console.log(`Server listening on port ${server.get('port')}`);
});
