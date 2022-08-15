const client = require('./client');
const fs = require('fs');
const path = require('path');

module.exports = async (pathToDir) => {
    const commandFiles = fs.readdirSync(pathToDir).filter(file => file.endsWith('.js'));
    for(const file of commandFiles) {
        const command = require(path.join(pathToDir, file));
        client.commands.set(command.name, command);
    }
}