//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'deposit',
    alias: ['dep', 'depositar'],
    permissions: [],
    category: 'currency',
    description: 'Con este comando depositas dinero en tu cuenta bancaria.',
    usage: '<prefix> deposit <cantidad>',
    async execute(client, message, args, R){
        let db = R.Databases.ranks;
        let e = R.emojis;
        let user = message.author;
        db.get(message.guild.id).then(async guild => {
            let info = guild[user.id];
            let amount = args[0] === 'all' ? 'all' : parseInt(args[0]);
            if(!amount) return message.reply('Debes especificar una cantidad.');
            if(isNaN(amount) && args[0] != 'all') return message.reply('La cantidad debe ser un número.');
            if(amount < 0) return message.reply('La cantidad debe ser mayor a 0.');
            if(amount > info.ballance.wallet) return message.reply('No tienes suficiente dinero en tu cartera.');
            if(args[0] == 'all') amount = info.ballance.wallet;
            if(amount > 1000000) return message.reply('No puedes depositar más de 1 millón de monedas.');
            info.ballance.wallet -= amount;
            info.ballance.bank += amount;
            guild[user.id] = info;
            await db.set(message.guild.id, guild);
            let embed = new R.embed()
                .setColor('#00fc00')
                .setTitle(`💰 Deposito 💰`)
                .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                .setDescription(`
                Has depositado **${amount}**${e.coin} en tu cuenta.
                `)
            message.reply({embeds: [embed]})
        });
    }
}