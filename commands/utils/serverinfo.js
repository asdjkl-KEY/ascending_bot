//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'serverinfo',
    alias: [],
    permissions: [],
    category: 'utils',
    description: 'Con este comando puedes ver la información del servidor.',
    usage: '<prefix> serverinfo',
    async execute(client, message, args, R){
        let server = message.guild;
        let owner = client.users.cache.get(server.ownerId);
        let verificationLevel = ['🟢 Ninguno', '🟢 Bajo', '🟡 Medio', '🟠 Alto', '🔴 Muy Alto'];
        let explicitFilter = ['🔵 Desactivado', '🟡 Medio', '🔴 Alto'];
        let embed = new R.embed()
        .setTitle(server.name)
        .setThumbnail(server.iconURL({dynamic: true}))
        .setColor('#fcfc00')
        .setFooter({text: 'pedido por: '+message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setTimestamp()
        .setFields(
            { name: 'ID', value: "👙 "+server.id+"", inline: true },
            { name: 'Dueño', value: owner ? "🙍/🙍‍♀️ "+owner.tag : "🙍/🙍‍♀️ "+server.ownerID+"", inline: true },
            { name: 'Miembros', value: "👥 "+server.memberCount+"", inline: true },
            { name: 'Bots', value: "🤖 "+server.members.cache.filter(m => m.user.bot).size+"", inline: true },
            { name: 'Roles', value: "🎨 "+server.roles.cache.size+"", inline: true },
            { name: 'Canales', value: "🧮 "+server.channels.cache.size+"", inline: true },
            { name: 'Creado el', value: "🗓️ "+server.createdAt.toLocaleString(), inline: true },
            { name: 'Emojis', value: "😜 "+server.emojis.cache.size+"", inline: true },
            { name: 'Nitro Boosts', value: "<:boost:1054728505872617512> "+server.premiumSubscriptionCount+"", inline: true },
            { name: 'Nitro Boosts Nivel', value: "<:boost:1054728505872617512> "+server.premiumTier+"", inline: true },
            { name: 'Verificación', value: verificationLevel[server.verificationLevel], inline: true },
            { name: 'Nivel de filtrado de contenido', value: explicitFilter[server.explicitContentFilter], inline: true }
        )
        message.channel.send({embeds: [embed]});
    }
}