const { Database } = require('jesscode-lib');
const db = new Database('currency');
const { EmbedBuilder } = require('discord.js');
const { botProperties } = require('../../utils/database');
let coin = '<:Bahrs:1013192853687648306>';

module.exports = {
    name: 'ballance',
    alias: ['bal'],
    category: 'currency',
    description: 'Check your ballance',
    usage: 'ballance [',
    async execute(client, message, args){
        const user = message.author;
        if(!db.has(`${user.id}`)){
            db.set(`${user.id}`, {
                bank: 0,
                wallet: 0
            });
        }
        const ballance = await db.get(`${user.id}`);
        let embed = new EmbedBuilder()
            .setTitle(`Balance de ${user.username}`)
            .setColor('#00ff00')
            .setAuthor({name: user.tag, iconURL: user.displayAvatarURL()})
            // .setDescription(`**Banco:** \`${ballance.bank}\` \n**Billetera:** \`${ballance.wallet}\``)
            .addFields({name: "Billetera", value: coin+" "+ballance.wallet, inline: true})
            .addFields({name: "Banco:", value: coin+" "+ballance.bank, inline: true})
            .addFields({name: "Total:", value: coin +" "+(ballance.wallet + ballance.bank), inline: true})
            .setTimestamp()
            .setFooter({text:'A-Devs Studio', iconURL: await botProperties.get('icon')});

            console.log(user)
        message.reply({embeds: [embed]});
    }
    
}