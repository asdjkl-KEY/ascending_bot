const { Database, setRoot } = require('jesscode-lib');
const path = require('path');
setRoot(path.join(__dirname, '../databases/'));
const botProperties = new Database('botProperties');
const db = new Database('General_Database');

module.exports = { botProperties, db };