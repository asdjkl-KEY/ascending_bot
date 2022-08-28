const { EmbedBuilder, Embed } = require('discord.js');
// const { botProperties } = require('../utils/database');
const { Database } = require('jesscode-lib');
const db = new Database('currency');
let coin = require('../../utils/coinEmote.js');
const { botProperties } = require('../../utils/database.js');
// const { setCooldown, hasCooldown, replyCooldown } = require('../../utils/tools.js');

module.exports = {
    name: 'getjob',
    alias: ['getjob'],
    category: 'currency',
    description: 'Con este comando puedes conseguir un empleo',
    usage: 'getjob <trabajo>',
    async execute(client, message, args){
        const user = message.author;
        const salaries = {
            police: 500,
            famer: 300,
            miner: 1000,
            robber: 1500
        }
        let jobs = ['police', 'famer', 'miner', 'robber'];
        let jobsjefs = {
            police: 'Un oficial de la policia Nacional',
            farmer: 'Un viejo, dueño de una gran Hacienda',
            miner: 'Un explotador de esclavos',
            robber: 'El criminal mas buscado'
        }
        let job = args[0];
        if(!job) return message.reply('Necesitas especificar que tipo de trabajo quieres ('+jobs+')');
        if(!salaries[job]) return message.reply('Ese trabajo no existe');
        if(!db.has(`${user.id}`)){
            db.set(`${user.id}`, {
                bank: 0,
                wallet: 0
            });
        }
        let ballance = await db.get(`${user.id}`);
        if(ballance.job){
            return message.reply('Ya tienes un trabajo, si quieres cambiar de empleo debes pagar la multa de indennizacion, ejecutando el comando **'+await botProperties.get('prefix')+'changejob**.')
        }
        ballance.job = job;
        let embed = new EmbedBuilder()
        .setAuthor({name: user.username, iconURL: user.displayAvatarURL()})
        .setColor('#00fc00')
        .setDescription(`${jobsjefs[job]} te ha contratado y ahora recibiras a partir de ${coin} **${salaries[job]} Bahrs** por cada trabajo`)
        .setFooter({text: user.tag, iconURL: user.displayAvatarURL()})
        .setTimestamp();
        db.set(`${user.id}`, ballance)
        return message.reply({embeds: [embed]});
    }
}