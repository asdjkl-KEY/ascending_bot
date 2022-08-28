const { EmbedBuilder } = require('discord.js');
const { botProperties } = require('../../utils/database');
const { Database } = require('jesscode-lib');
const db = new Database('currency');
let coin = require('../../utils/coinEmote.js');
const { setCooldown, hasCooldown, replyCooldown } = require('../../utils/tools.js');

module.exports = {
    name: 'jobs',
    alias: ['trabajos'],
    category: 'currency',
    description: 'Con este comando puedes saber los trabajos disponibles y sus respectivos salarios',
    usage: 'jobs | trabajos',
    async execute(client, message, args){
        const user = message.author;
        const jobs = {
            police: {
                salary: 500,
                name: 'Policía',
                description: 'Siendo policía puedes capturar a los ladrones usando el comando **'+await botProperties.get('prefix')+'cap** si el robo ha ocurrido dentro de 30 segundos'
            },
            farmer: {
                salary: 300,
                name: 'Granjero',
                description: 'Siendo granjero te ganas la vida dignamente, cabe la diminuta posibilidad que encuentres un tesoro enterrado mientras estas arando la tierra'
            },
            miner: {
                salary: 1000,
                name: 'Minero',
                description: 'Siendo minero solo tú puedes sacarle el verdadero jugo a la mina, podrás usar el comando `mine` cada 10 min y cabe la posibilidad de encontrar minerales valiosos'
            },
            robber: {
                salary: 1500,
                name: 'Ladrón',
                description: 'Siendo ladrón puedes asaltar bancos con el comando `asalt` y robar a los demas usuarios usando el comando `rob <user>`, el ladrón tiene mas probabilidad de ser capturado mientras ejecuta su trabajo (`work`)'
            }
        }
        let police = jobs.police;
        let farmer = jobs.farmer;
        let miner = jobs.miner;
        let robber = jobs.robber;
        let embed = new EmbedBuilder()
        .setAuthor({name: user.username, iconURL: user.displayAvatarURL()})
        .setColor('#00fc00')
        .addFields(
            {name: 'Police, Salario a partir de: '+coin+' '+police.salary, value: police.description},
            {name: 'Granjero, Salario a partir de: '+coin+' '+farmer.salary, value: farmer.description},
            {name: 'Minero, Salario a partir de: '+coin+' '+miner.salary, value: miner.description},
            {name: 'Ladrón, Salario a partir de: '+coin+' '+robber.salary, value: robber.description}
            )
        .setTimestamp()
        .setFooter({text: user.tag, iconURL: user.displayAvatarURL()});
        message.reply({embeds: [embed]});
        
    }
}