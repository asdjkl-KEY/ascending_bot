//R son los recursos enviados desde el handler.

module.exports = {
    name: 'xp',
    alias: [],
    permissions: [p.Administrator],
    category: 'admin',
    description: 'Con este comando activas el sistema de xp en el servidor.',
    usage: '<prefix> xp <on/off>',
    async execute(client, message, args, R){
        let action = args[0];
        if(!action) return message.reply('Debes especificar una acción.');
        let guild = await R.Databases.general.get(message.guild.id);
        if(action === 'on'){
            if(guild['xpactived']){
                return message.reply('El sistema de xp ya está activado.');
            }
            guild['xpactived'] = true;
            await R.Databases.general.set(message.guild.id, guild);
            return message.reply('El sistema de xp ha sido activado.');
        }
        if(action === 'off'){
            if(!guild['xpactived']){
                return message.reply('El sistema de xp ya está desactivado.');
            }
            guild['xpactived'] = false;
            await R.Databases.general.set(message.guild.id, guild);
            return message.reply('El sistema de xp ha sido desactivado.');
        }
    }
}