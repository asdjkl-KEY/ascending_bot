//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'top',
    alias: [],
    permissions: [],
    category: 'utils',
    description: 'Con este comando puedes saber el top de xp de los usuarios del servidor.',
    usage: '<prefix> top [tipo]',
    async execute(client, message, args, R){
        let type = args[0];
        if(!type) type = 'xp';
        let db = R.Databases.ranks;
        let guild = await db.get(message.guild.id);
        if(Object.keys(guild). length === 0) return message.reply('No hay datos para mostrar.');
        let data = [];
        let usersId = Object.keys(guild);
        for(let i = 0; i < usersId.length; i++){
            let user = await client.users.fetch(usersId[i]);
            let userData = guild[usersId[i]];
            let xp = userData.xp;
            let level = userData.level;
            data.push({ user: user, xp: xp, level: level});
        }
        data.sort((a, b) => b[type] - a[type]);
        let embed = new R.embed()
            .setColor('#00fc00')
            .setTitle(`Top de ${type} del servidor ${message.guild.name}`)
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        let description = '';
        for(let i = 0; i < data.length; i++){
            description += `${i + 1} ${i+1 === 1 ? '🥇' : i+1 === 2 ? '🥈' : i+1 === 3 ? '🥉' : ''} ${data[i].user.tag} - ${data[i][type]}}\n`;
        }
        embed.setDescription(description);
        message.reply({ embeds: [embed] });
    }
}