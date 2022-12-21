//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'clear-chat',
    alias: ['clear'],
    permissions: [p.ManageMessages],
    category: 'admin',
    description: 'Con este comando eliminas un número específico de mensajes en el canal actual.',
    usage: '<prefix> clear-chat <cantidad>',
    async execute(client, message, args, R){
        let quantity = args[0];
        if(!quantity) return message.reply('Debes especificar la cantidad de mensajes a eliminar.');
        if(isNaN(parseInt(quantity))) return message.reply('La cantidad de mensajes a eliminar debe ser un número.');
        if(parseInt(quantity) > 100) return message.reply('No puedes eliminar más de 100 mensajes a la vez.');
        if(parseInt(quantity) < 1) return message.reply('No puedes eliminar menos de 1 mensaje.');
        let messages = await message.channel.messages.fetch({ limit: parseInt(quantity) + 1 });
        await message.channel.bulkDelete(messages);
        message.channel.send(`Se eliminaron ${quantity} mensajes.`).then(m => {
            setTimeout(() => {
                m.delete().then(() => {})
                .catch(err => console.log(err));
            }, 7000);
        });
    }
}