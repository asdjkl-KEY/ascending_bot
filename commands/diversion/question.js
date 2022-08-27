// const { botProperties } = require('../utils/database');
//const { Database } = require('jesscode-lib');
//const db = new Database('<name>');
const { _ET } = require('../../utils/tools');

module.exports = {
    name: 'question',
    alias: ['question', 'q'],
    category: 'private',
    description: 'Hazme una pregunta y tal vez te responda.',
    usage: '[question | q] <pregunta>',
    async execute(client, message, args){
        const question = args.join(" ");
        const answers = ["Sí", "No", "Tal vez", "Es posible", "No lo creo", "Probablemente", "No lo sé", "Creo que no", "Creo que sí", "A lo mejor sí", "A lo mejor no"];
        const answer = answers[Math.floor(Math.random() * answers.length)];
        if(!question){
            let embed = new _ET({
                title: 'Error',
                description: 'Debes escribir una pregunta.',
                color: '#fc0303',
                message
            });
            return embed.send();
        }
        let embed = new _ET({
            title: 'Pregunta',
            description: `${message.author.username} pregunta: **${question}**\n\nMi Respuesta es: **${answer}**`,
            color: 'random',
            message
        });
        return embed.send();
    }
}