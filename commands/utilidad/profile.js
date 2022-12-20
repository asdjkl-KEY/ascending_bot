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
            .setFields('Nombre:', user.username)
            .setFields('ID:', user.id)
            .setFields('Discriminador:', user.discriminator)
            .setFields('Bot:', user)
            .setFields('Cuenta creada:', user.createdAt)
            .setFields('Se unió a este servidor:', message.guild.members.cache.get(user.id).joinedAt)
            .setFields('Roles:', message.guild.members.cache.get(user.id).roles.cache.map(r => r).join(' '))
            .setFooter({ text: `pedido por: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        message.channel.send({embeds: [embed]});
    }
}