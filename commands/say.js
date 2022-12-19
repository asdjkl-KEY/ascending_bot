//R son los recursos enviados desde el handler.

module.exports = {
    name: 'say',
    alias: [],
    category: 'private',
    description: 'Manda un mensaje como el bot',
    usage: '<prefix> say <mensaje>',
    async execute(client, message, args, R){
        if(parseInt(message.author.id) !== R.BotProperties.ownerID) return;
        const msg = args.join(' ');
        message.delete().catch(err => console.log(err))
        message.channel.send(msg);
    }
}