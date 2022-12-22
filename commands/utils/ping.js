//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'ping',
    alias: [],
    permissions: [],
    category: 'utils',
    description: 'Con este comando puedes saber el ping del bot.',
    usage: '<prefix> ping',
    async execute(client, message, args, R){
        let embed = new R.embed()
            .setColor('#00fc00')
            .setTitle('Pong!')
            .setDescription(`Mi ping es de ${client.ws.ping}ms`)
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        message.reply({ embeds: [embed] });
    }
}