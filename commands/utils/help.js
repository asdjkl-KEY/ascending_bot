//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'help',
    alias: ['ayuda'],
    permissions: [],
    category: 'utils',
    description: 'Con este comando puedes obtener ayuda sobre los comandos del bot.',
    usage: '<prefix> help <comando>',
    async execute(client, message, args, R){
        let command = args[0];
        if(!command) return message.reply('Debes especificar un comando.\nSi quieres obtener la lista de comandos usa /help');
        let cmd = client.commands.get(command) || client.commands.find(c => c.alias.includes(command));
        if(!cmd) return message.reply('No se ha encontrado el comando especificado.');
        let embed = new R.embed()
            .setColor('#00fc00')
            .setTitle(`Comando: ${cmd.name}`)
            .setDescription(`Descripción: ${cmd.description}\nUso: ${cmd.usage.replace('<prefix>', R.BotProperties.prefix)}\nCategoría: ${cmd.category}`)
            .setFooter({ text: `"<>" = obligatorio, "[]" = opcional`, iconURL: message.author.displayAvatarURL() });
        message.reply({ embeds: [embed] });
    }
}