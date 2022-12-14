//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'slot-machine',
    alias: ['slot'],
    permissions: [],
    category: 'currency',
    description: 'Con este comando puedes jugar a la mรกquina tragamonedas',
    usage: '<prefix> slot <cantidad>',
    async execute(client, message, args, R){
        let quantity = parseInt(args[0]);
        let user = message.author;
        let e = R.emojis;
        let slot = ['๐', '๐', '๐', '๐', '๐', '๐', '๐', '๐', '๐', '๐', '๐', '๐', '๐', '๐', '๐ฅ', '๐ฅ', '๐ฅฅ', '๐ฅฆ', '๐ฅ', '๐ฅ'];
        if(!quantity) return message.reply('Debes ingresar una cantidad');
        if(isNaN(quantity)) return message.reply('Debes ingresar una cantidad vรกlida');
        if(quantity < 1) return message.reply('Debes ingresar una cantidad vรกlida');
        if(quantity > 300) return message.reply('La cantidad mรกxima que puedes apostar es de 300');
        let db = R.Databases.ranks;
        let guild = await db.get(message.guild.id);
        if(!guild) return message.reply('Este servidor no estรก registrado en la base de datos');
        let info = guild[user.id];
        if(!info) return message.reply('No estรกs registrado en la base de datos');
        if(quantity > info.ballance.wallet) return message.reply('No tienes suficiente dinero para apostar esa cantidad');
        info.ballance.wallet -= quantity;
        let probability = Math.floor(Math.random() * 100);
        let slot1 = slot[Math.floor(Math.random() * slot.length)];
        let slot2 = slot[Math.floor(Math.random() * slot.length)];
        let slot3 = slot[Math.floor(Math.random() * slot.length)];
        let slot4 = slot[Math.floor(Math.random() * slot.length)];
        let slot5 = slot[Math.floor(Math.random() * slot.length)];
        let slot6 = slot[Math.floor(Math.random() * slot.length)];
        let slot7 = slot[Math.floor(Math.random() * slot.length)];
        let slot8 = slot[Math.floor(Math.random() * slot.length)];
        let slot9 = slot[Math.floor(Math.random() * slot.length)];
        let msg;
        if(probability > 75){
            slot4 = e.coin;
            slot5 = e.coin;
            slot6 = e.coin;
        }
        if(probability > 97){
            slot1 = e.coin;
            slot2 = e.coin;
            slot3 = e.coin;
            slot4 = e.coin;
            slot5 = e.coin;
            slot6 = e.coin;
            slot7 = e.coin;
            slot8 = e.coin;
            slot9 = e.coin;
        }
        let lost = false;
        let doctor = false;
        if(info.work){
            if(info.work.current === 'doctor') doctor = true;
        }
        if(slot4 === slot5 && slot5 === slot6){
            info.ballance.wallet += doctor == true ? quantity*3 + (quantity*2)*0.30 : quantity*3;
            msg = `ยกHas ganado **${doctor == true ? quantity*2 + (quantity*2)*0.30 : quantity*2}**!`
        }
        if(slot1 === slot2 && slot2 === slot3 && slot3 === slot4 && slot4 === slot5 && slot5 === slot6 && slot6 === slot7 && slot7 === slot9){
            info.ballance.wallet += doctor == true ? quantity*10 + (quantity*9)*0.30 : quantity*10;
            msg = `ยกHas ganado **${doctor == true ? quantity*9 + (quantity*9)*0.30 : quantity*9}**!`
        }
        if(slot4 !== slot5 || slot5 !== slot6 || slot4 !== slot6){
            msg = `Has perdido **${quantity}**`;
            lost = true;
        }
        let embed = new R.embed()
        .setTitle('๐ฐ Mรกquina tragamonedas ๐ฐ')
        .setDescription(`
        ${msg}
        ${slot1} ${slot2} ${slot3}
        ${slot4} ${slot5} ${slot6} โฌ๏ธ
        ${slot7} ${slot8} ${slot9}
        `)
        .setColor(lost === true ? '#fc0303' : '#03fc03')
        .setTimestamp();
        guild[user.id] = info;
        await db.set(message.guild.id, guild);
        message.reply({embeds: [embed]});
    }
}