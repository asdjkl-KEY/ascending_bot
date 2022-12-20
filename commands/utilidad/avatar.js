//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'avatar',
    alias: [],
    permissions: [],
    category: 'utils',
    description: 'Con este comando puedes ver el avatar de un usuario mencionado o el tuyo.',
    usage: '<prefix> avatar [usuario]',
    async execute(client, message, args, R){
        let user = message.mentions.users.first() || message.author;
        let embed = new R.embed()
            .setColor('#ff0000')
            .setTitle(`Avatar de ${user.username}`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setFooter({ text: `pedido por: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        message.channel.send({embeds: [embed]});
    }
}