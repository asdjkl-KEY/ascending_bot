//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'membercount',
    alias: ['mc'],
    permissions: [p.ManageGuild],
    category: 'admin',
    description: 'Con este comando puedes saber cuantos miembros hay en el servidor.',
    usage: '<prefix> membercount',
    async execute(client, message, args, R){
        let db = R.Databases.general;
        if(!db.has(message.guild.id)){
            db.set(message.guild.id, {
                leaves: 0
            });
        } else {
            let guild = await db.get(message.guild.id);
            if(!guild.leaves) guild.leaves = 0;
            db.set(message.guild.id, guild);
        }
        let guild = await db.get(message.guild.id);
        let members = message.guild.members.cache;
        let total = members.size;
        let bots = members.filter(m => m.user.bot).size;
        let humans = total - bots;
        let embed = new R.embed()
        .setTitle('Miembros del servidor')
        .setDescription(`Total: ${total}\nBots: ${bots}\nHumanos: ${humans}\nAbandonos: ${guild.leaves}`)
        .setColor("#"+Math.floor(Math.random() * 16777299).toString(16))

        message.reply({embeds: [embed]})
    }
}