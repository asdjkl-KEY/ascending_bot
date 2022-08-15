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
        botProperties.set('prefix', args[0]);
        return message.reply(`Prefix set to ${args[0]}`);
    }
}