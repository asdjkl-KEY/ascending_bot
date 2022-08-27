// const { EmbedBuilder } = require('discord.js');
// const { botProperties } = require('../utils/database');
//const { Database } = require('jesscode-lib');
//const db = new Database('<name>');
const { _ET } = require('../../utils/tools');

module.exports = {
    name: 'register',
    alias: ['register', 'signup'],
    category: 'private',
    description: 'Este comando Registra a un usuario en la base de datos para que sea administrador del bot || Este comando también pre-registra usuarios para determinado evento.',
    usage: 'register <usuario> <eventType | permission>',
    async execute(client, message, args){
        return message.reply("TODO: Este comando se esta implementando.");
    }
}