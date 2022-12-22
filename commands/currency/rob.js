//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'rob',
    alias: ['robar'],
    permissions: [],
    category: 'currency',
    description: 'Con este comando puedes robar a otros usuarios. Pero ten cuidado no siempre saldrá bien.',
    usage: '<prefix> rob <usuario>',
    async execute(client, message, args, R){
        let user = message.author;
        let victim = message.mentions.users.first();
        if(!victim) return message.reply('Debes mencionar a un usuario.');
        if(victim.id === user.id) return message.reply('No puedes robarte a ti mismo.');
        if(victim.user.bot || victim.bot) return message.reply('No puedes robar a un bot.');
        let e = R.emojis;
        let db = R.Databases.ranks;
        let guild = await db.get(message.guild.id);
        let info = guild[user.id];
        let victimInfo = guild[victim.id];
        if(!victimInfo) return message.reply('El usuario al que quieres robar no tiene perfil.');
        let quantity = Math.floor(Math.random() * victimInfo.ballance.wallet);
        if(quantity > 5000) quantity = 5000;
        if(quantity <= 0) return message.reply('Este usuario no tiene dinero no seas imbécil.');
        let casosBien = [
            `Entraste a un autobús y asaltaste a un pasajero y resultó ser ${victim}. Y te has llevado **${quantity}**${e.coin} de su cartera.`,
            `En una tienda de conveniencia entraste y asaltaste a un cliente y resultó ser ${victim}. Y te has llevado **${quantity}**${e.coin} de su cartera.`,
            `Entraste a una casa de noche y era la casa de ${victim}. Y te has llevado **${quantity}**${e.coin} de su cartera.`,
            `Entraste a la casa de ${victim} viste unos queridos ${quantity}${e.coin} en la mesa y te los llevaste.`,
            `Dejaste inconsciente a ${victim} y te has llevado **${quantity}**${e.coin} de su cartera.`,
            `Estafaste a ${victim} y te has llevado **${quantity}**${e.coin} de su cartera.`,
            `Has amenazado a ${victim} y te ha dado **${quantity}**${e.coin} para que lo dejes vivir.`
        ];
        let casosMal = [
            `Entraste a un autobús y asaltaste a un pasajero y resultó ser ${victim}. Pero te pillaron, te han arrestado y tuviste que pagar una multa de **${quantity}**${e.coin}.`,
            `En una tienda de conveniencia entraste y asaltaste a un cliente y resultó ser ${victim}. Pero te pillaron, te han arrestado y tuviste que pagar una multa de **${quantity}**${e.coin}.`,
            `Entraste a una casa de noche y era la casa de ${victim}. Pero el muy astuto te ha pillado, te han arrestado y tuviste que pagar una multa de **${quantity}**${e.coin}.`,
            `Entraste a la casa de ${victim} viste unos queridos ${quantity}${e.coin} en la mesa y te los llevaste. Pero su casa tenía cámaras de seguridad, te han pillado, arrestado y tuviste que pagar una multa de **${quantity}**${e.coin}.`,
            `Dejaste inconsciente a ${victim} y te has llevado **${quantity}**${e.coin} de su cartera. La policía te alcanzó, te han arrestado y tuviste que pagar una multa de **${quantity}**${e.coin}.`,
            `Estafaste a ${victim} y te has llevado **${quantity}**${e.coin} de su cartera. Pero te pillaron, te han arrestado y tuviste que pagar una multa de **${quantity}**${e.coin}.`,
            `Has amenazado a ${victim} y te ha dado **${quantity}**${e.coin} para que lo dejes vivir. Pero era familia de mafiosos, te han pillado y tuviste que pagar **${quantity}**${e.coin} para que te dejaran vivir.`
        ];
        let probability = Math.floor(Math.random() * 100);
        if(probability >= 35){
            victimInfo.ballance.wallet -= quantity;
            info.ballance.wallet += quantity;
            message.reply(casosBien[Math.floor(Math.random() * casosBien.length)]);
        } else {
            info.ballance.wallet -= quantity;
            message.reply(casosMal[Math.floor(Math.random() * casosMal.length)]);
        }
        guild[user.id] = info;
        guild[victim.id] = victimInfo;
        await db.set(message.guild.id, guild);
    }
}