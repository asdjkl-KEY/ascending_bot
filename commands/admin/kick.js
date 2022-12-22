//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'kick',
    alias: [],
    category: 'admin',
    permissions: [p.KickMembers],
    description: 'Con este comando puedes expulsar a una persona',
    usage: '<prefix> kick <@user> <razón>',
    async execute(client, message, args, R){
        const user = message.author;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ');
        if(!message.member.permissions.has(p.KickMembers)) return message.reply('No tienes permisos para ejecutar este comando.');
        if(!member) return message.reply('Debes mencionar a un usuario.');
        if(member.id === message.author.id) return message.reply('No puedes expulsarte');
        if(member.id === client.user.id) return message.reply('No puedo expulsarme.');
        if(member.id === message.guild.ownerId) return message.reply('No puedes expulsar al dueño del servidor.');
        if(!reason) return message.reply('Debes especificar una razón.');
        //bot missing permissions
        
        if(member.permissions.has(p.KickMembers) && user.id !== message.guild.ownerId && user.id !== R.BotProperties.ownerID) return message.reply('No puedes expulsar a este usuario.');
        if(member.kickable){
            const embed = new R.embed()
                .setColor('#ff0000')
                .setTitle('KICK')
                .setDescription(`El usuario __**${member.user.tag}**__ ha sido expulsado por __**${user.tag}**__\nRazón: __**${reason}**__`)
                .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
            await member.kick({ reason: reason });
            let db = R.Databases.general;
            let g = await db.get(message.guild.id);
            if(g && g.logs){
                if(g.logs.kick){
                    let channel = message.guild.channels.cache.get(g.logs.kick);
                    if(channel) channel.send({ embeds: [embed] });
                }
            }
            //react with check
            message.react('✅');
        }
    }
}