const client = require('./modules/client');
const server = require('./utils/server');
const path = require('path');
const handler = require('./modules/handler');

//*Load Commands//
handler(path.join(__dirname, '/commands/'));
handler(path.join(__dirname, '/commands/admin/'));


server.listen(server.get('port'), () => {
    console.log(`Server listening on port ${server.get('port')}`);
});

client.login(client.properties.token);