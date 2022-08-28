const { EmbedBuilder } = require('discord.js');
const { botProperties } = require('../../utils/database');
const { Database } = require('jesscode-lib');
const db = new Database('currency');
let emotes = require('../../helpers/emotes.js');
const { setCooldown, hasCooldown, replyCooldown } = require('../../utils/tools.js');
const allWorks = require('../../helpers/works.js');

module.exports = {
    name: 'work',
    alias: ['trabajar'],
    category: 'currency',
    description: 'Con este comando realizas tu trabajo cotidiano',
    usage: 'work | trabajar',
    async execute(client, message, args){
        const user = message.author;
        const topic = `${user.id}:work`;
        const salaries = {
            police: 500,
            farmer: 300,
            miner: 1000,
            robber: 1500
        }
        if(!db.has(`${user.id}`)){
            db.set(`${user.id}`, {
                bank: 0,
                wallet: 0
            });
        }
        if(await hasCooldown(topic)){
            return replyCooldown(message, topic);
        }
        if(!db.has(`${user.id}`)){
            db.set(`${user.id}`, {
                bank: 0,
                wallet: 0
            });
        }
        let ballance = await db.get(`${user.id}`);
        if(!ballance || !ballance.job){
            let embed = new EmbedBuilder()
            .setAuthor({name: user.username, iconURL: user.displayAvatarURL()})
            .setColor('#fc0000')
            .setDescription(`Aun no tienes un trabajo, para conseguir uno usa el comando **${await botProperties.get('prefix')}getjob <trabajo>** `)
            .setFooter({text: user.tag, iconURL: user.displayAvatarURL()})
            .setTimestamp();

            return message.reply({embeds: [embed]})
        }
        let works = allWorks[ballance.job];
        let work = works[Math.floor(Math.random() * works.length)];
        let embed = new EmbedBuilder()
        .setAuthor({name: user.username, iconURL: user.displayAvatarURL()})
        .setFooter({text: user.tag, iconURL: user.displayAvatarURL()})
        .setTimestamp();
        if(work.startsWith('!')){
            work = work.replace('!', '');
            let quantity = Math.floor(Math.random() * salaries[ballance.job]);
            embed.setColor('#fc0000');
            embed.setDescription(`${work} ${emotes.coin} ${quantity} **Bahrs**`);
            ballance.wallet -= quantity;
            db.set(`${user.id}`, ballance);
            message.reply({embeds: [embed]});
            return setCooldown(3600000, topic);
        }
        if(works.startsWith('&')){
            work = work.replace('&', '');
            let quantity = Math.floor(Math.random() * salaries[ballance.job]) * 10;
            embed.setColor('#00fc00');
            embed.setDescription(`${work} ${emotes.coin} **${quantity} Bahrs**`);
            ballance.wallet += quantity;
            db.set(`${user.id}`, ballance);
            message.reply({embeds: [embed]});
            return setCooldown(3600000, topic);
        }
        let quantity = Math.floor(Math.random() * salaries[ballance.job]) + salaries[ballance.job];
        embed.setColor('#00fc00');
        embed.setDescription(`${work} ${emotes.coin} **${quantity} Bahrs** por tus esfuerzos`);
        ballance.wallet += quantity;
        db.set(`${user.id}`, ballance);
        message.reply({embeds: [embed]});
        return setCooldown(3600000, topic);
    }
}