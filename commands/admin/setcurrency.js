//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'setcurrency',
    alias: ['establecer-economia'],
    permissions: [p.Administrator],
    category: 'admin',
    description: 'Con este comando puedes establecer el canal de economia en el servidor.',
    usage: '<prefix> setcurrency <canal>',
    async execute(client, message, args, R){
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if(!channel) return message.reply('Debes mencionar un canal o poner su id.');
        let db = R.Databases.general;
        let guild = await db.get(message.guild.id);
        if(!guild) guild = {};
        guild.currency = channel.id;
        await db.set(message.guild.id, guild);
        return message.reply(`El canal de economia del servidor ha sido establecido en ${channel}.`);
    }
}