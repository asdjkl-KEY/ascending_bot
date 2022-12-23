//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'top',
    alias: [],
    permissions: [],
    category: 'utils',
    description: 'Con este comando puedes saber el top de xp de los usuarios del servidor.',
    usage: '<prefix> top [tipo]',
    async execute(client, message, args, R){
        let type = args[0];
        let page = args[1] || 1;
        let types = ['xp', 'level', 'money'];
        if(!type) type = 'xp';
        if(!types.includes(type)) return message.reply('El tipo de top no es válido.');
        let db = R.Databases.ranks;
        db.get(message.guild.id).then(async guild => {
            if(!guild) return message.reply('No hay datos para mostrar.');
            if(Object.keys(guild). length === 0) return message.reply('No hay datos para mostrar.');
            let datas = [];
            let usersId = Object.keys(guild);
            for(let i = 0; i < usersId.length; i++){
                let user = await client.users.fetch(usersId[i]);
                let userData = guild[usersId[i]];
                let xp = userData.xp;
                let level = userData.level;
                if(!guild[usersId[i]][type]) continue;
                let info = guild[usersId[i]];
                info.user = user;
                datas.push(info);
            }
            if(datas.length === 0) return message.reply('No hay datos para mostrar.');
            datas.sort((a, b) => (type === 'money' ? (b.ballace.wallet + b.ballance.bank) : b[type]) - (type === 'money' ? (a.ballance.wallet + a.ballace.bank) : a[type]));
            if(datas.length > 10){
                let pages = Math.ceil(datas.length / 10);
                if(page > pages) return message.reply('La página no existe.');
                let data = datas.slice((page - 1) * 10, page * 10);
                let embed = new R.embed()
                    .setColor('#00fc00')
                    .setTitle(`Top de ${type} del servidor ${message.guild.name}`)
                    .setFooter({ text: `página ${page}/${datas.length}`, iconURL: message.author.displayAvatarURL() });
                let description = '';
                for(let i = 0; i < data.length; i++){
                    description += `${i + 1} ${i+1 === 1 ? '🥇' : i+1 === 2 ? '🥈' : i+1 === 3 ? '🥉' : ''} ${data[i].user.tag} \`${type.toUpperCase()}: ${data[i][type]}\`\n`;
                }
                embed.setDescription(description);
                return message.reply({ embeds: [embed] });
            } else {
                let embed = new R.embed()
                    .setColor('#00fc00')
                    .setTitle(`Top de ${type} del servidor ${message.guild.name}`)
                    .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
                let description = '';
                for(let i = 0; i < datas.length; i++){
                    description += `${i + 1} ${i+1 === 1 ? '🥇' : i+1 === 2 ? '🥈' : i+1 === 3 ? '🥉' : ''} ${datas[i].user.tag} \`${type.toUpperCase()}: ${datas[i][type]}\`\n`;
                }
                embed.setDescription(description);
                return message.reply({ embeds: [embed] });
            }
        })
    }
}