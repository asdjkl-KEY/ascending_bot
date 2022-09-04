const { Database } = require('jesscode-lib');
const botProperties = new Database('botProperties');
const db = new Database('General_Database');

module.exports = { botProperties, db };