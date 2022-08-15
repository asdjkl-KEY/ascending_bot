const express = require('express');
const server = express();
server.set('port', process.env.PORT || 3227);

server.all('/', (req, res) => {
    res.send('Hello World!');
    console.log('Hello World!');
});

module.exports = server;