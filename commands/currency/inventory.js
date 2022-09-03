const { EmbedBuilder } = require('discord.js');
// const { botProperties } = require('../../utils/database');
const { Database, ToolKit } = require('jesscode-lib');
const bags = new Database('bags');
let emotes = require('../../helpers/emotes.js');
let dic = require('../../helpers/dictionary');
// const { setCooldown, hasCooldown, replyCooldown } = require('../../utils/tools.js');
const tk = new ToolKit();

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
        .setFooter({text: `Página ${page+1}/${pages.length}`})
        .setTimestamp();
        if(pages.length > 0){
            embed.setDescription(items.map(i => {
                return `**${emotes[bag[i].emote]} ${dic[i]}** \`x${bag[i].quantity}\`\n`
            }));
        } else {
            embed.setDescription(`**Tu inventario está vacío  >-<**`);
        }
        message.reply({embeds: [embed]});
    }
}