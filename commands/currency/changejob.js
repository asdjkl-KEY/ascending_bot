const { EmbedBuilder } = require('discord.js');
const { botProperties } = require('../utils/database');
const { Database } = require('jesscode-lib');
const db = new Database('currency');
let coin = require('../../utils/coinEmote.js');
const { setCooldown, hasCooldown, replyCooldown } = require('../../utils/tools.js');

module.exports = {
    name: 'changejob',
    alias: ['changejob'],
    category: 'currency',
    description: 'Con este comando puedes cambiar de trabajo',
    usage: 'changejob <job>',
    async execute(client, message, args){
        const user = message.author;
        const topic = `${user.id}:changejob`;
        let job = args[0];
        if(!job) return message.reply('especifica el trabajo al que quieres cambiar');
        if(!db.has(`${user.id}`)){
            db.set(`${user.id}`, {
                bank: 0,
                wallet: 0
            });
        }
        if(await hasCooldown(topic)){
            return replyCooldown(message, topic);
        }
        let priceofchange = {
            police: 10000,
            farmer: 6000,
            miner: 20000,
            robber: 30000
        }
        let ballance = await db.get(`${user.id}`);
        if(!ballance.job){
            return message.reply('No tienes ningun trabajo por lo que no puedes cambiarlo, para conseguir trabajo ejecuta **'+await botProperties.get('prefix')+'getjob**');
        }
        if(!priceofchange[job]) return message.reply('Ese trabajo no existe');
        if(ballance.job === job){
            return message.reply('Este es tu trabajo actual')
        }
        if(ballance.wallet < priceofchange[job]){
            return message.reply(`No tienes suficiente dinero para cambiar de trabajo necesitas ${coin} **${priceofchange[job]} Bahrs**`)
        }
        ballance.job = job;
        ballance.wallet -= priceofchange[job];
        db.set(`${user.id}`, ballance);
        let embed = new EmbedBuilder()
        .setAuthor({name: user.username, iconURL: user.displayAvatarURL()})
        .setColor('#00fc00')
        .setDescription(`Has cambiado de empleo exitosamente y te ha costado ${coin} **${priceofchange[job]} Bahrs**`)
        .setFooter({text: user.tag, iconURL: user.displayAvatarURL()})
        .setTimestamp();
        message.reply({embeds: [embed]});
        return setCooldown(3600000, topic);
    }
}