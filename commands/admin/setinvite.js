//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'set-invite',
    alias: ['setinvite'],
    permissions: [p.ManageGuild],
    category: 'admin',
    description: 'Con este comando estableces el canal de Bienvenidas',
    usage: '<prefix> set-invite <canal>',
    async execute(client, message, args, R){
        let type = args[1];
        let types = ['embed', 'canvas'];
        let channel = message.mentions.channels.first();
        if(!channel) return message.reply('Debes mencionar el canal de Bienvenidas.');
        if(!type) {
            type = 'embed';
        }
        if(!types.includes(type)) return message.reply('El tipo de bienvenida debe ser embed o canvas.');
        let db = R.Databases.general;
        let guild = await db.get(message.guild.id);
        guild.welcome = {
            id: channel.id,
            type: type
        };
        message.reply(`El canal de bienvenidas se ha establecido en ${channel}.`);
    }
}