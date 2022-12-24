//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'roulette',
    alias: ['ruleta'],
    permissions: [],
    category: 'currency',
    description: 'Con este comando puedes jugar a la ruleta',
    usage: '<prefix> roulette <cantidad> <color/número>',
    async execute(client, message, args, R){
        let quantity = parseInt(args[0]);
        let colornumber = args[1];
        if(isNaN(quantity)) return message.reply('Debes ingresar una cantidad válida');
        if(!quantity) return message.reply('Debes ingresar una cantidad');
        if(!colornumber) return message.reply('Debes ingresar un color o número');
        if(isNaN(parseInt(colornumber)) && colornumber != 'rojo' && colornumber != 'negro' && colornumber != 'verde') return message.reply('Debes ingresar un color o número válido');
        if(quantity < 1) return message.reply('Debes ingresar una cantidad válida');
        if(quantity > 500) return message.reply('La cantidad máxima que puedes apostar es de 500');
        let db = R.Databases.ranks;
        let r = R.Databases.roulette;
        let rGuild = await r.get(message.guild.id);
        let e = R.emojis;
        if(!rGuild){
            rGuild = {
                users: {},
                time: Date.now() + 30000,
                first: true
            }
            await r.set(message.guild.id, rGuild);
        }
        if(rGuild){
            if(!rGuild.users[message.author.id]){
                rGuild.users[message.author.id] = {
                    quantity: quantity,
                    colorOrNumber: colornumber
                }
                await r.set(message.guild.id, rGuild);
            } else {
                if(rGuild.users[message.author.id].colorOrNumber != colornumber) return message.reply('No puedes apostar a un color o número diferente al anterior');
                rGuild.users[message.author.id].quantity += quantity;
                await r.set(message.guild.id, rGuild);
            }
        }
        let guild = await db.get(message.guild.id);
        if(!guild) return message.reply('Este servidor no está registrado en la base de datos');
        let user = message.author;
        let info = guild[user.id];
        if(!info) return message.reply('No estás registrado en la base de datos');
        if(!info.ballance) return message.reply('No tienes dinero en tu billetera');
        if(info.ballance.wallet < quantity) return message.reply('No tienes suficiente dinero en tu billetera');
        let number = Math.floor(Math.random() * 37);
        let color = number % 2 == 0
        ? 'rojo' : 'negro';
        if(number == 0) color = 'verde';
        let win = false;
        if(colornumber == color || colornumber == number) win = true;
        //set winners
        info.ballance.wallet -= quantity;
        guild[user.id] = info;
        await db.set(message.guild.id, guild);
        let embed2 = new R.embed()
        .setTitle('RULETA')
        .setDescription(`Has apostado **${quantity}** ${e.coin} a **${colornumber}** en unos segundos se revelará el resultado`)
        .setColor('#03fc03')
        .setImage(R.links.roulette)
        embed2.setFields({name: 'Faltan', value: `**${await R.getTime(rGuild.time - Date.now())}**`})
        message.reply({embeds: [embed2]});
        await r.set(message.guild.id, rGuild);

        async function checkRoulette(){
            if(rGuild.first == true){
                rGuild.first = false;
                setTimeout(async () => {
                    let g = await db.get(message.guild.id);
                    let rr = await r.get(message.guild.id);
                    if(!rr) return;
                    if(!rr.users) return;
                    let us = Object.keys(rr.users);
                    let winners = [];
                    let description = `La bola ha caido en el número \`${number}\`, color \`${color}\`\n\n`;
                    let embed = new R.embed()
                    .setTitle('RULETA')
                    .setDescription(description)
                    .setColor(win == true ? "#03fc03" : "#fc0303");
                    for (let i of us){
                        let u = rr.users[i];
                        if(u.colorOrNumber == color || u.colorOrNumber == number){
                            let ug = g[i];
                            if(!ug) continue;
                            if(!ug.ballance) continue;
                            ug.ballance.wallet += u.quantity * 2;
                            g[i] = ug;
                            await db.set(message.guild.id, g);
                            winners.push(`<@${i}>`);
                        }
                    }
                    if(winners.length > 0){
                        embed.setFields(
                            {name: 'Ganadores', value: `${ winners.join('\n')}`}
                        )
                    } else {
                        embed.setFields(
                            {name: 'Ganadores', value: 'No hay ganadores'}
                        )
                    }
                    message.channel.send({embeds: [embed]});
                }, rGuild.time - Date.now())
            }
        }
        checkRoulette();
    }
}