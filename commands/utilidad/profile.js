//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'profile',
    alias: [],
    permissions: [],
    category: 'utils',
    description: 'Con este comando puedes saber la información de un usuario o la tuya.',
    usage: '<prefix> profile [usuario]',
    async execute(client, message, args, R){
        let user = message.mentions.users.first() || message.author;
        let embed = new R.embed()
            .setColor('#ff0000')
            .setTitle(`Perfil de ${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setFields(
                { name: 'Nombre de usuario', value: user.username, inline: true },
                { name: 'Tag', value: user.tag, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: 'Bot', value: user.bot ? "Verdadero" : "Falso", inline: true },
                { name: 'Cuenta creada el', value: user.createdAt, inline: true },
                { name: 'Estado', value: user.presence.status, inline: true },
                { name: 'Actividad', value: user.presence.activities[0] ? user.presence.activities[0].name : "Ninguna", inline: true },
                { name: 'Roles', value: message.guild.members.cache.get(user.id).roles.cache.map(r => r).join(' | '), inline: true },
                { name: 'Se unió a este servidor el', value: message.guild.members.cache.get(user.id).joinedAt, inline: true},
                { name: 'Nickname', value: message.guild.members.cache.get(user.id).nickname ? message.guild.members.cache.get(user.id).nickname : "Ninguno", inline: true }

            )
            .setLinks({ url: user.displayAvatarURL({ dynamic: true, size: 2048 }) })
            .setFooter({ text: `pedido por: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        message.channel.send({embeds: [embed]});
    }
}