const { botProperties } = require('../../utils/database');

module.exports = {
    name: 'setprefix',
    alias: ['setprefix'],
    category: 'admin',
    description: 'Set the prefix for the bot',
    usage: 'setprefix <prefix>',
    execute(client, message, args){
        if(!args[0]){
            return message.channel.send('Necesitas especificar el prefijo');
        }
        if(message.author.id !== message.guild.owner.id) return message.reply('Solo el dueño del servidor puede usar este comando');
        botProperties.set('prefix', args[0]);
        return message.reply(`Prefix set to ${args[0]}`);
    }
}