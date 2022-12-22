//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'ballance',
    alias: ['bal', 'money'],
    permissions: [],
    category: 'currency',
    description: 'Con este comando puedes ver tu dinero o el de otro usuario.',
    usage: '<prefix> ballance [usuario]',
    async execute(client, message, args, R){
        let db = R.Databases.ranks;
        let e = R.emojis;
        let user = message.mentions.users.first() || message.author;
        if(user.bot) return message.reply('Los bots no tienen dinero.');
        let guild = await db.get(message.guild.id);
        if(!guild) return message.reply('No hay datos para mostrar.');
        if(Object.keys(guild). length === 0) return message.reply('No hay datos para mostrar.');
        let member = guild[user.id];
        if(!member) return message.reply('No hay datos para mostrar.');
        let embed = new R.embed()
            .setColor('#00fc00')
            .setTitle(`⚖️ Dinero de ${user.tag} ⚖️`)
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`
            **${e.wallet} Cartera:** \`${member.ballance.wallet}\` ${e.coin}
            **${e.bank} Banco:** \`${member.ballance.bank}\` ${e.coin}
            **${e.moneybag} Total:** \`${member.ballance.bank + member.ballance.wallet}\` ${e.coin}
            `)
            message.reply({embeds: [embed]})
    }
}