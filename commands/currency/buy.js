const { EmbedBuilder } = require('discord.js');
// const { botProperties } = require('../../utils/database');
const { Database } = require('jesscode-lib');
const db = new Database('currency');
const inventory = new Database('bags');
const shop = new Database('shop');
let emotes = require('../../helpers/emotes.js');
// const { setCooldown, hasCooldown, replyCooldown } = require('../../utils/tools.js');

module.exports = {
    name: 'buy',
    alias: ['comprar'],
    category: 'currency',
    description: 'Con este comando puedes comprar un item en la tienda',
    usage: 'buy <item> | buy <ID>',
    async execute(client, message, args){
        const user = message.author;
        const tienda = await shop.getAll();
        let itemName = args[0];
        let quantity = parseInt(args[1]);
        if(!args[1]) quantity = 1;
        let ballance = await db.get(`${user.id}`);
        let bag = await inventory.get(`${user.id}`);
        if(!itemName) return message.reply('Especifica el item o su ID');
        if(isNaN(parseInt(itemName))){
            if(!tienda[itemName]) return message.reply('El item no existe en la tienda');
            let item = tienda[itemName];
            if(ballance.wallet < item.price) return message.reply('No tienes suficiente dinero para comprar este item');
            if(bag[itemName] && item.stackable === false) return message.reply('El item no se puede apilar.');
            if(quantity > 1 && item.stackable === false) return message.reply('El item no se pueede apilar.');
            if(bag[itemName]){
                bag[itemName].quantity += quantity;
            }
            if(!bag[itemName]){
                bag[itemName] = {
                    quantity: quantity,
                    emote: item.emote,
                    stackable: item.stackable,
                    uses: (item.uses ? item.uses : null)
                }
            }
            inventory.set(`${user.id}`, bag);
            ballance.wallet -= item.price * quantity;
            let embed = new EmbedBuilder()
            .setAuthor({name: user.username, iconURL: user.displayAvatarURL()})
            .setColor('#00fc00')
            .setTimestamp()
            .setDescription(`Has comprado **${itemName} ${emotes[item.emote]} x${quantity}** y costó ${emotes.coin} **${item.price} Bahrs**`);

            message.reply({embeds: [embed]})
        }
    }
}