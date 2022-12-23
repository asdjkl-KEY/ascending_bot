//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'withdraw',
    alias: ['with', 'retirar'],
    permissions: [],
    category: 'currency',
    description: 'Con este comando puedes retirar dinero de tu banco.',
    usage: '<prefix> withdraw <cantidad>',
    async execute(client, message, args, R){
        let db = R.Databases.ranks;
        let e = R.emojis;
        let user = message.author;
        db.get(message.guild.id).then(async guild => {
            let info = guild[user.id];
            let amount = args[0] === 'all' ? 'all' : parseInt(args[0]);
            if(!amount) return message.reply('Debes ingresar una cantidad a retirar.');
            if(amount > info.ballance.bank) return message.reply('No tienes esa cantidad de dinero en tu banco.');
            if(amount < 0) return message.reply('No puedes retirar una cantidad negativa.');
            if(isNaN(amount && args[0] != 'all')) return message.reply('La cantidad debe ser un número.');
            if(args[0] == 'all') amount = info.ballance.bank;
            info.ballance.wallet += amount;
            info.ballance.bank -= amount;
            guild[user.id] = info;
            await db.set(message.guild.id, guild);
            let embed = new R.embed()
                .setColor('#00fc00')
                .setTitle(`💰 Retirar 💰`)
                .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                .setDescription(`
                Has retirado **${amount}**${e.coin} de tu cuenta.
                `)
            message.reply({embeds: [embed]})
        });
    }
}