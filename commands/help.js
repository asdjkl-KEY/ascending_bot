const { EmbedBuilder } = require('discord.js');
//const { Database } = require('jesscode-lib');
//const db = new Database('<name>');

module.exports = {
    name: 'help',
    alias: ['help'],
    category: 'public',
    description: 'Te brinda ayuda sobre un comando o muestra todos los comandos',
    usage: 'help | help <comando>',
    async execute(client, message, args, Variables){
        const user = message.author;
        if(!args[0]){
            // const embed = new EmbedBuilder()
            //     .setTitle('Lista de comandos')
            //     .setColor('#00ff00')
            //     .setDescription('Para ver la ayuda de un comando, escribe `help <comando>`');
            // message.channel.send({embeds: [embed]});
            // return;
            let categories = [];
            let commands = {}
            client.commands.map(c => {
                if(!commands[c.category]){
                    commands[c.category] = [];
                    if(c.category !== 'private'){
                        categories.push(c.category);
                    }
                }
                commands[c.category].push(c.name)
            })
            let embed = new EmbedBuilder()
            .setAuthor({name: user.username, iconURL: user.displayAvatarURL()})
            .setColor('#00fc00')
            .setFooter({text: "Para saber sobre un comando usa **"+Variables.BotProperties.prefix+"help <comando>**"})
            .setTimestamp()
            .addFields(categories.map(category => {
                return {
                    name: Variables.Dictionary[category].toUpperCase(),
                    value: `${commands[category].map(cmd => {
                        return `\`${cmd}\`${commands[category].indexOf(cmd) == 0 ? '' : commands[category].indexOf(cmd) % 9 == 0 ? `\n` : ``}`
                    })}`
                }
            }))
            return message.reply({embeds: [embed]});
        }
        const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.name && cmd.alias.includes(args[0]));
        if(!command){
            return message.channel.send('Comando no encontrado');
        }
        if(command.category === 'private' && parseInt(message.author.id) !== parseInt(Variables.BotProperties.ownerID)){
            return message.reply('El comando es privado y solo el equipo de desarrollo puede usarlo, por lo cuál no puede describirse');
        }
        const embed = new EmbedBuilder()
            .setTitle(`Ayuda para el comando ${command.name}`)
            .setColor('#00ff00')
            .setDescription(`**Nombre:** \`${command.name}\` \n**Alias:** \`${command.alias}\` \n**Categoria:** \`${command.category}\` \n**Descripcion:** \`${command.description}\` \n**Uso:** \`${command.usage}\``)
            .setFooter({text:'<> obligatorio, [] opcional'})
            .setTimestamp();

        message.channel.send({embeds: [embed]});
    }
}