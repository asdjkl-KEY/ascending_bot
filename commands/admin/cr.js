//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'cr',
    alias: [],
    permissions: [],
    category: 'private',
    description: 'F',
    usage: '<prefix> cr',
    async execute(client, message, args, R){
        //console log of roles in the channel
        console.log(message.channel);
    }
}