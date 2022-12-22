//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'pay',
    alias: ['pagar'],
    permissions: [],
    category: 'currency',
    description: 'Con este comando puedes pagar a otro usuario.',
    usage: '<prefix> pay <usuario> <cantidad>',
    async execute(client, message, args, R){
        let user = message.author;
        let payed = message.mentions.users.first();
        let db = R.Databases.ranks;
        let e = R.emojis;
        let guild = await db.get(message.guild.id);
        if(!payed) return message.reply('Debes mencionar a un usuario.');
        if(payed.bot) return message.reply('No puedes pagar a un bot.');
        if(payed.id === user.id) return message.reply('No puedes pagarte a ti mismo.');
        let amount = parseInt(args[1]);
        if(!amount) return message.reply('Debes ingresar una cantidad a pagar.');
        if(isNaN(amount) && args[1] != 'all') return message.reply('Debes ingresar una cantidad válida a pagar.');
        let info = guild[user.id];
        let info2 = guild[payed.id];
        if(!info) return message.reply('No tienes dinero para pagar.');
        if(!info2) return message.reply('El usuario al que quieres pagar no tiene perfil.');
        if(amount > info.ballance.wallet) return message.reply('No tienes esa cantidad de dinero en tu billetera.');
        if(amount <= 0) return message.reply('No puedes pagar una cantidad negativa.');
        if(args[1] === 'all') amount = info.ballance.wallet;
        info.ballance.wallet -= amount;
        info2.ballance.wallet += amount;
        guild[user.id] = info;
        guild[payed.id] = info2;
        await db.set(message.guild.id, guild);
        let embed = new R.embed()
            .setColor('#00fc00')
            .setTitle(`💰 Pagar 💰`)
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`
            Has pagado **${amount}**${e.coin} a **${payed}**.
            `)
        message.reply({embeds: [embed]})
    }
}