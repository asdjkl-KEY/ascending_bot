//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'countleaves',
    alias: ['cls'],
    permissions: [p.Administrator],
    category: 'owner',
    description: 'Con este comando empiezas a contar las salidas del servidor.',
    usage: '<prefix> countleaves true/false',
    async execute(client, message, args, R){
        let action = args[0];
        if(!action) return message.reply('Debes especificar una acción.');
        let db = R.Databases.general;
        if(!db.has(message.guild.id)){
            db.set(message.guild.id, {
                leaves: 0
            });
        }
        let guild = await db.get(message.guild.id);
        if(action === 'true'){
            if(guild['leavesactived']){
                return message.reply('El sistema de salidas ya está activado.');
            }
            guild['leavesactived'] = true;
            guild['leavesdate'] = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
            await db.set(message.guild.id, guild);
            return message.reply(`El sistema de salidas ha sido activado :white_check_mark:\nse contará a partir de \`${guild['leavesdate']}\``);
        }
        if(action === 'false'){
            if(!guild['leavesactived']){
                return message.reply('El sistema de salidas ya está desactivado.');
            }
            guild['leavesactived'] = false;
            guild['leavesdate'] = null
            guild.leaves = 0;
            await db.set(message.guild.id, guild);
            return message.reply('El sistema de salidas ha sido desactivado :white_check_mark:');
        }
    }
}