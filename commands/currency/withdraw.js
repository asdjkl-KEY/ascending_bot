const { EmbedBuilder } = require('discord.js');
// const { botProperties } = require('../utils/database');
const { Database } = require('jesscode-lib');
const db = new Database('currency');
let coin = require('../../utils/coinEmote.js');
const { setCooldown, hasCooldown, replyCooldown } = require('../../utils/tools.js');

module.exports = {
    name: 'withdraw',
    alias: ['with'],
    category: 'currency',
    description: 'Con este comando retiras dinero del banco',
    usage: 'withdraw <quantity> | withdraw all',
    async execute(client, message, args){
        const user = message.author;
        let topic = `${user.id}:withdraw`;
        if(!db.has(`${user.id}`)){
            db.set(`${user.id}`, {
                bank: 0,
                wallet: 0
            })
        }
        if(await hasCooldown(topic)){
            return replyCooldown(message, topic);
        }
        let ballance = await db.get(`${user.id}`);
        let quantity = (args[0] === 'all' ? 'all' : parseInt(args[0]));
        if(!quantity) return message.reply('Especifica la cantidad de '+coin+' **Bahrs** que deseas retirar');
        if(quantity !== 'all' && isNaN(quantity)) return message.reply('Ingresa una cantidad válida');
        if(quantity <= 0) return message.reply('La cantidad no puede ser menor o igual a 0');
        if(ballance.bank <= 0) return message.reply('No tienes esa cantidad en el banco');
        let embed = new EmbedBuilder()
        .setAuthor({name: user.tag, iconURL: user.displayAvatarURL()})
        .setColor('DarkGreen')
        .setDescription(`${coin} ${(quantity === 'all' ? ballance.bank : quantity)} **Bahrs** han sido retiradas del banco`)
        .setTimestamp()
        .setFooter({text: user.tag, iconURL: user.displayAvatarURL()});

        message.reply({embeds: [embed]});
        setCooldown(5000, topic);
        if(quantity === 'all'){
            ballance.wallet += ballance.bank;
            ballance.bank = 0;
            return db.set(`${user.id}`, ballance);
        }
        ballance.wallet += quantity;
        ballance.bank -= quantity;
        return db.set(`${user.id}`, ballance);
    }
}