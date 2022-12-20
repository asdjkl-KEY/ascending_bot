//R son los recursos enviados desde el handler.

module.exports = {
    name: 'disable',
    alias: [],
    permissions:[p.Administrator],
    category: 'admin',
    description: 'Con este comando desabilitas funciones del bot.',
    usage: '<prefix> disable <funcion>',
    async execute(client, message, args, R){
        let func = args[0];
        if(!func) return message.reply('Debes especificar una función.');
        let guild = await R.Databases.general.get(message.guild.id);
        if(func === 'nocomands'){
            guild.nocomands = true;
            R.Databases.general.set(message.guild.id, guild);
            return message.reply('La función \`Comando Inexistente\` ha sido desabilitada.');
        }
    }
}