//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'ban',
    alias: ['ban-member'],
    category: 'admin',
    permissions: [p.BanMembers],
    description: 'Con este comando puedes banear a una persona',
    usage: '<prefix> ban <@user> <razón>',
    async execute(client, message, args, R){
        const user = message.author;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ');
        if(!message.member.permissions.has(p.BanMembers)) return message.reply('No tienes permisos para ejecutar este comando.');
        if(!member) return message.reply('Debes mencionar a un usuario.');
        if(member.id === message.author.id) return message.reply('No puedes banearte a ti mismo.');
        if(member.id === client.user.id) return message.reply('No puedo banearme a mi mismo.');
        if(member.id === message.guild.ownerId) return message.reply('No puedes banear al dueño del servidor.');
        if(!reason) return message.reply('Debes especificar una razón.');
        //bot missing permissions
        
        if(member.permissions.has(p.BanMembers) && user.id !== message.guild.ownerId && user.id !== R.BotProperties.ownerID) return message.reply('No puedes banear a este usuario.');
        if(member.bannable){
            const embed = new R.embed()
                .setColor('#ff0000')
                .setTitle('BAN')
                .setDescription(`El usuario __**${member.user.tag}**__ ha sido baneado por __**${user.tag}**__\nRazón: __**${reason}**__`)
                .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
            await member.ban({ reason: reason });
            message.channel.send({embeds: [embed]});
        }
        if(await R.Databases.general.has(message.guild.id)){
            if(await R.Databases.general.get('logs')[message.guild.id]['ban']){
                const embed = new R.embed()
                    .setColor('#ff0000')
                    .setTitle('BAN')
                    .setDescription(`El usuario __**${member.user.tag}**__ ha sido baneado por __**${user.tag}**__\nRazón: __**${reason}**__`)
                    .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
                const channel = message.guild.channels.cache.get(await R.Databases.general.get('logs')[message.guild.id]['ban']);
                channel.send({embeds: [embed]});
            }
        }
    }
}