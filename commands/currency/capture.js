//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'capture',
    alias: ['cap'],
    permissions: [],
    category: 'currency',
    description: 'Con este comando puedes capturar a un ladrón que haya robado en los últimos 3 segundos.',
    usage: '<prefix> capture',
    async execute(client, message, args, R){
        let cooldown = R.cooldown;
        let user = message.author;
        let r = R.Databases.robs;
        let robs = await r.get(message.guild.id);
            if(!robs) return message.reply('No ha habido robos recientemente.');
            if(await cooldown.has(user, 'capture')) return message.reply(`Debes esperar **${await cooldown.get(user, 'capture')}** para usar este comando.`);
            let db = R.Databases.ranks;
            let e = R.emojis;
            let guild = await db.get(message.guild.id)
                let info = guild[user.id];
                robs.map(async rob => {
                    if(rob.validade <= Date.now()) return;
                    let ladron = client.users.cache.get(rob.user) ? client.users.cache.get(rob.user) : await client.users.fetch(rob.user);
                    let robber= guild[rob.user];
                    let victim = client.users.cache.get(rob.victim) ? client.users.cache.get(rob.victim) : await client.users.fetch(rob.victim);
                    let embed = new R.embed()
                        .setColor('#00fc00')
                        .setTitle(`💰 Captura 💰`)
                        .setFooter({ text: `Sos un crack ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                        .setDescription(`
                        ${ladron} ha robado **${rob.quantity}**${e.coin} a ${victim}.
                        Pero le has capturado y has conseguido quitarle **${rob.quantity}**${e.coin}.
                        `)
                    message.reply({embeds: [embed]})
                    robber.ballance.wallet -= rob.quantity;
                    info.ballance.wallet += rob.quantity;
                    guild[rob.user] = robber;
                })
                await cooldown.set(user, 'capture', 3600);
                await r.set(message.guild.id, []);
                guild[user.id] = info;
                await db.set(message.guild.id, guild);
    }
}