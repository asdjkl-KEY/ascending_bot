const { EmbedBuilder } = require('discord.js');
// const { botProperties } = require('../utils/database');
const { Database } = require('jesscode-lib');
const db = new Database('currency');
let emotes = require('../../helpers.emotes.js');
const { setCooldown, hasCooldown, replyCooldown } = require('../../utils/tools.js');

module.exports = {
    name: 'daily',
    alias: ['dailies'],
    category: 'currency',
    description: 'Con este comando obtienes un valor de monedas por día',
    usage: 'daily | dailies',
    async execute(client, message, args){
        let daily = Math.floor(Math.random() * 500) + 500;
        const user = message.author;
        const topic = `${user.id}:daily`
        if(!db.has(`${user.id}`)){
            db.set(`${user.id}`, {
                bank: 0,
                wallet: 0
            });
        }
        if(await hasCooldown(topic)){
            return replyCooldown(message, topic);
        }
        let ballance = await db.get(`${user.id}`);
        let embed = new EmbedBuilder()
        .setAuthor({name: user.username, iconURL: user.displayAvatarURL()})
        .setColor('#00fc00')
        .setDescription(`Hoy has recibido ${emotes.coin} **${daily} Bahrs**. Vuelve por más en 24h`)
        .setFooter({text: user.tag, iconURL: user.displayAvatarURL()})
        .setTimestamp();

        ballance.wallet += daily;
        db.set(`${user.id}`, ballance);
        message.reply({embeds: [embed]})
        return setCooldown(3600000 *24, topic);
    }
}