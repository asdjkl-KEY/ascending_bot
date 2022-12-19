//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
const p = PermissionsBitField.Flags;

module.exports = {
    name: 'unlock',
    alias: [],
    category: 'admin',
    description: 'Con este comando puedes desbloquear el chat del servidor.',
    usage: '<prefix> unlock',
    async execute(client, message, args, R){
        let guild = await R.Databases.general.get(message.guild.id);
        //permission
        if(!message.member.permissions.has(p.Administrator)) return message.reply('No tienes permisos para usar este comando.');
        if(guild.lock && !guild.lock.includes(message.channel.id)){
            return message.reply('Este canal ya está desbloqueado.');
        }
        if(!guild.lock){
            return message.reply('Este canal ya está desbloqueado.');
        }
        //lock
        if(guild.lock.includes(message.channel.id)){
            guild.lock.splice(guild.lock.indexOf(message.channel.id), 1);
        }
        R.Databases.general.set(message.guild.id, guild);
        let channel = message.channel;
        //remove permission for everyone
        channel.permissionOverwrites.edit(message.guild.roles.everyone, {
            SendMessages: true
        });
        message.reply('El canal ha sido desbloqueado :unlock:');
    }
}