const { EmbedBuilder } = require('discord.js');
// const { botProperties } = require('../utils/database');
const { Database } = require('jesscode-lib');
const db = new Database('currency');
let emotes = require('../../helpers.emotes.js');
const { setCooldown, hasCooldown, replyCooldown } = require('../../utils/tools.js');

module.exports = {
    name: 'deposit',
    alias: ['dep'],
    category: 'currency',
    description: 'Con este comando depositas tus monedas en el banco',
    usage: 'deposit <quantity> | deposit all',
    async execute(client, message, args){
        let user = message.author;
        if(!db.has(`${user.id}`)){
            db.set(`${user.id}`, {
                bank: 0,
                wallet: 0
            })
        }
        if(await hasCooldown(`${user.id}:deposit`)){
            return replyCooldown(message, `${user.id}:deposit`)
        }
        const ballance = await db.get(`${user.id}`);
        let quantity = args[0] === 'all' ? 'all' : parseInt(args[0]);
        if(!quantity) return message.reply('Debes especificar una cantidad');
        if(quantity !== 'all' && isNaN(quantity)) return message.reply('Ingresa una cantidad válida');
        if(quantity <= 0) return message.reply('La cantidad de '+emotes.coin+' **Bahrs** no puede ser igual o menor a 0');
        if(quantity === 'all' && ballance.wallet <= 0) return message.reply('No tienes suficientes '+emotes.coin+' **Bahrs** para depositar')
        let embed = new EmbedBuilder()
        .setAuthor({name: user.tag, iconURL: user.displayAvatarURL()})
        .setColor('#00fc00')
        .setDescription(`${emotes.coin} ${(quantity === 'all' ? ballance.wallet + ballance.bank : quantity)} **Bahrs** han sido depositados en el banco.`)
        .setTimestamp()
        .setFooter({text: user.tag, iconURL: user.displayAvatarURL()});
        message.reply({embeds: [embed]})
        setCooldown(5000, `${user.id}:deposit`)
        if(quantity === 'all'){
            ballance.bank += ballance.wallet;
            ballance.wallet = 0;
            return db.set(`${user.id}`, {
                bank: ballance.bank,
                wallet: ballance.wallet
            })
        }
        ballance.bank += quantity;
        ballance.wallet -= quantity;
        return db.set(`${user.id}`, ballance)
    }
}