const { EmbedBuilder } = require('discord.js');
// const { botProperties } = require('../utils/database');
const { Database } = require('jesscode-lib');
const db = new Database('currency');
let coin = '<:Bahrs:1013192853687648306>';
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
        if(hasCooldown(`${user.id}:deposit`)){
            return replyCooldown(message, `${user.id}:deposit`)
        }
        const ballance = await db.get(`${user.id}`);
        let quantity = args[0] === 'all' ? 'all' : parseInt(args[0]);
        if(!quantity) return message.reply('Debes especificar una cantidad');
        if(quantity !== 'all' && isNaN(quantity)) return message.reply('Ingresa una cantidad válida');
        if(quantity <= 0) return message.reply('La cantidad de '+coin+' **Bahrs** no puede ser igual o menor a 0');
        if(quantity === 'all' && ballance.wallet <= 0) return message.reply('No tienes suficientes '+coin+' **Bahrs** para depositar')
        let embed = new EmbedBuilder()
        .setAuthor({name: user.tag, iconURL: user.displayAvatarURL()})
        .setColor('#00fc00')
        .setDescription(`${coin} ${(quantity === 'all' ? ballance.wallet + ballance.bank : quantity)} **Bahrs** han sido depositados en el banco.`)
        .setTimestamp()
        .setFooter({text: user.tag, iconURL: user.displayAvatarURL()});
        message.reply({embeds: [embed]})
        setCooldown(10000)
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