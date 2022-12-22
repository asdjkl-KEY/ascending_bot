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
        db.get(message.guild.id).then(async guild => {
            // console.log(message.guild.members.cache.size+ "\n\n"+ await message.guild.members.fetch())
            let members = message.guild.memberCount;
            let bots = 0;
            message.guild.members.cache.forEach(member => {
                if(member.user.bot) bots++;
            })
            let humans = members - bots;
            let embed = new R.embed()
            .setTitle('Miembros del servidor')
            .setDescription(`Total: ${members}\nBots: ${bots}\nHumanos: ${humans}\nAbandonos: ${guild.leaves ? guild.leaves : ''} ${guild.leavesactived ? `a partir de \`${guild.leavesdate}\`` : '(Desactivado)'}`)
            .setColor("#"+Math.floor(Math.random() * 16777299).toString(16))
    
            message.reply({embeds: [embed]})
        })
    }
}