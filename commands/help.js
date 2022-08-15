const { EmbedBuilder } = require('discord.js');
const { botProperties } = require('../utils/database');
//const { Database } = require('jesscode-lib');
//const db = new Database('<name>');

module.exports = {
    name: 'help',
    alias: ['help'],
    category: 'public',
    description: 'Te brinda ayuda sobre un comando o muestra todos los comandos',
    usage: 'help | help <comando>',
    async execute(client, message, args){
        if(!args[0]){
            const embed = new EmbedBuilder()
                .setTitle('Lista de comandos')
                .setColor('#00ff00')
                .setDescription('Para ver la ayuda de un comando, escribe `help <comando>`')
                .setFooter({text:'Powered by A-Devs Studio', iconURL: await botProperties.get('icon')});
            message.channel.send({embeds: [embed]});
            return;
        }
        const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.name && cmd.alias.includes(args[0]));
        if(!command){
            return message.channel.send('Comando no encontrado');
        }
        if(command.category === 'private' && parseInt(message.author.id) !== parseInt(await botProperties.get('ownerID'))){
            return message.reply('El comando es privado y solo el equipo de desarrollo puede usarlo, por lo cuál no puede describirse');
        }
        const embed = new EmbedBuilder()
            .setTitle(`Ayuda para el comando ${command.name}`)
            .setColor('#00ff00')
            .setDescription(`**Nombre:** \`${command.name}\` \n**Alias:** \`${command.alias}\` \n**Categoria:** \`${command.category}\` \n**Descripcion:** \`${command.description}\` \n**Uso:** \`${command.usage}\``)
            .setFooter({text:'Powered by A-Devs Studio', iconURL: await botProperties.get('icon')});

        message.channel.send({embeds: [embed]});
    }
}