const { Database } = require('jesscode-lib');
const db = new Database('currency');
const { EmbedBuilder } = require('discord.js');
const { botProperties } = require('../../utils/database');

module.exports = {
    name: 'ballance',
    alias: ['bal'],
    category: 'currency',
    description: 'Check your ballance',
    usage: 'ballance',
    async execute(client, message, args){
        const user = message.author.id;
        if(!db.has(`${user.id}`)){
            db.set(`${user.id}`, {
                bank: 0,
                wallet: 0
            });
        }
        const ballance = await db.get(`${user.id}`);
        let embed = new EmbedBuilder()
            .setTitle(`Balance de ${message.author.username}`)
            .setColor('#00ff00')
            .setDescription(`**Banco:** \`${ballance.bank}\` \n**Billetera:** \`${ballance.wallet}\``)
            .setFooter({text:'Powered by A-Devs Studio', iconURL: await botProperties.get('icon')});

        message.reply({embeds: [embed]});
    }
    
}