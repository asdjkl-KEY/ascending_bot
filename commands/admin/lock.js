//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
const p = PermissionsBitField.Flags;

module.exports = {
    name: 'lock',
    alias: [],
    category: 'admin',
    description: 'Con este comando puedes bloquear el chat del servidor.',
    usage: '<prefix> lock',
    async execute(client, message, args, R){
        let guild = await R.Databases.general.get(message.guild.id);
        //permission
        if(!message.member.permissions.has(p.Administrator)) return message.reply('No tienes permisos para usar este comando.');
        if(guild.lock && guild.lock.includes(message.channel.id)){
            return message.reply('Este canal ya está bloqueado.');
        }
        if(!guild.lock){
            guild.lock = [message.channel.id];
        }
        //lock
        if(!guild.lock.includes(message.channel.id)){
            guild.lock.push(message.channel.id);
        }
        R.Databases.general.set(message.guild.id, guild);
        let channel = message.channel;
        //remove permission for everyone
        channel.permissionOverwrites.edit(message.guild.roles.everyone, {
            SendMessages: false
        });
        message.reply('El canal ha sido bloqueado :lock:');
    }
}