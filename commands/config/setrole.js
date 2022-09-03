// const { EmbedBuilder } = require('discord.js');
// const { botProperties } = require('../../utils/database');
//const { Database } = require('jesscode-lib');
//const db = new Database('<name>');
let emotes = require('../../helpers/emotes.js');
const { setCooldown, hasCooldown, replyCooldown } = require('../../utils/tools.js');

module.exports = {
    name: 'setrole',
    alias: ['roleset', 'setrol'],
    category: 'config',
    description: 'Con este comando puedes colocar un rol a un usuario',
    usage: 'setrole <usuario>',
    async execute(client, message, args){
        
    }
}