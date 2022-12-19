//R son los recursos enviados desde el handler.

module.exports = {
    name: 'register',
    alias: [''],
    category: 'private',
    description: 'Con este comando puedes registrarte en el Realm.',
    usage: '<prefix> register <gamertag>',
    async execute(client, message, args, R){
        const xl = R.xl;
        const db = R.Databases.registers;
        if(db.has(message.author.id)) return message.reply('Ya estás registrado en el Realm.');
        let gamertag = args.join(' ');
        if(!gamertag) return message.reply('Escribe tu gamertag.');
        xl.people.find(gamertag, 1).then(res => {
            if(res.people.length === 0){
                message.reply("Tal parece que el gamertag escrito no existe!")
            } else {
                const user = res.people[0];
                db.set(message.author.id, {
                    gamertag: user.gamertag,
                    xuid: user.xuid,
                    avatar: user.avatar ? user.avatar : user.displayPicRaw
                });
                message.reply("Te has registrado correctamente, recibirás un mensaje con el link de invitación en breve.");
                xl.people.profile.get(user.xuid).then(res => console.log(res.profileUsers[0].settings))
            }
        });
    }
}