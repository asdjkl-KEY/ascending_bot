const { EmbedBuilder } = require('discord.js');
// const { botProperties } = require('../../utils/database');
const { Database, ToolKit } = require('jesscode-lib');
const bags = new Database('bags');
let emotes = require('../../helpers/emotes.js');
const tk = new ToolKit();
// const { setCooldown, hasCooldown, replyCooldown } = require('../../utils/tools.js');

module.exports = {
    name: 'inventory',
    alias: ['bag'],
    category: 'currency',
    description: 'Con este comando podrás ver todo lo que está en tu inventario',
    usage: 'inventory [page] | bag [page]',
    async execute(client, message, args){
        const user = message.author;
        let bag = await bags.get(`${user.id}`);
        let itemKeys = Object.keys(bag);
        let pages = tk.paginate(itemKeys, 10);
        let page = parseInt(args[0]) -1;
        if(isNaN(parseInt(args[0])) || !args[0] || parseInt(args[0])-1 <= 0) page = 0;
        let items = pages[page];
        let embed = new EmbedBuilder()
        .setAuthor({name: user.username, iconURL: user.displayAvatarURL()})
        .setColor('#00fc00')
        .setFields(items.map(i => {
            return {
                name: i,
                value: 'x'+bag[i].quantity
            }
        }))
        .setFooter({text: `Página ${page+1}/${pages.length}`})
        .setTimestamp();
        message.reply({embeds: [embed]});
    }
}