//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'daily',
    alias: [],
    permissions: [],
    category: 'currency',
    description: 'Con este comando puedes recibir tu recompensa diaria.',
    usage: '<prefix> daiily',
    async execute(client, message, args, R){
        let cooldown = R.cooldown;
        let user = message.author;
        if(cooldown.has(user, 'daily')) return message.reply(`Debes esperar **${await cooldown.get('daily')}** para usar este comando.`);
        let db = R.Databases.ranks;
        let e = R.emojis;
        let guild = await db.get(message.guild.id);
        let info = guild[user.id];
        info.ballance.wallet += 1000;
        info.money += 1000;
        guild[user.id] = info;
        db.set(message.guild.id, guild);
        cooldown.set(user, 'daily', 3600 * 24);
        let embed = new R.embed()
            .setColor('#00fc00')
            .setTitle(`💰 Recompensa diaria 💰`)
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`
            Has recibido **1000**${e.coin} monedas.
            `)
        message.reply({embeds: [embed]})
    }
}