//R son los recursos enviados desde el handler.

module.exports = {
    name: 'gamertag',
    alias: ['gmc', 'tag'],
    category: 'private',
    description: '...',
    usage: '<prefix> gamertag <mensaje>',
    async execute(client, message, args, R){
        const xl = R.xl;
        let gametarg = args.join(' ');
        if(!gametarg) return message.reply('No se obtuvo ningún mensaje.');
        xl.people.find(gametarg, 1).then(res => {
            if(res.people.length === 0){
                let embed = new R.embed()
                    .setColor('#ff0000')
                    .setTitle('USUARIO INEXISTENTE')
                    .setDescription(`El usuario __**\`${gametarg}\`**__ no existe en la plataforma Xbox-Live\nVerifica el gametarg e inténtalo de nuevo.`)
                    .setThumbnail(R.links.notfound)

                return message.channel.send({embeds: [embed]});
            } else {
            let user = res.people[0];
            let tiers = {
                "Gold": "#FFD700",
                "Silver": "#C0C0C0",
                "Free": "#FFFFFF"
            }
            let embed = new R.embed()
                .setColor(tiers[user.detail.accountTier])
                .setTitle(gametarg)
                .setThumbnail(user.avatar ? user.avatar : user.displayPicRaw)
                .addFields(
                    { name: 'Gametarg', value: user.gamertag ? user.gamertag : 'No definido' },
                    { name: 'XUID', value: user.xuid ? user.xuid : 'No definido'},
                    { name: 'Seguidores', value: user.detail.followerCount ? user.detail.followerCount+"" : '0' },
                    { name: 'Puntos', value: user.gamerScore ? user.gamerScore : 'No definido'},
                )

            return message.reply({embeds: [embed]});
            }
        });
    }
}