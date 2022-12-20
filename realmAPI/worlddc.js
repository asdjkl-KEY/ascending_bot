
// const { Client, BitField } = require('discord.js')
// const client = new Client({ intents: ["GUILD_MESSAGES", "GUILDS", "MESSAGE_CONTENT"] });
// require('dotenv/config')

// const { addMessage } = require('./ws')


// const plugin = fs.readFileSync('plugins/chatranks.js', 'utf-8')



async function worlddc(evd, chat) {
    if(evd.content.trim().startsWith('!')) return;
    let prefix = '$';
    let msg = evd.content;
    let sender = evd.author;
    console.log(msg)
    var args = msg.slice(prefix.length).split(' ')
    var cmd = args[0]
    var admins = config.admins
    if (evd.channel.id == config.channel && sender.id != client.user.id) {
        if (msg.startsWith(prefix)) {
            if (!admins.includes(sender.id)) {
                evd.reply('No tienes permisos para usar este comando')
                return;
            }
            if (evd.channel.id == config.channel) {
                chat.emit('command', sender.username, sender.discriminator, msg.slice(prefix.length))
            }
        }
        else {
            if (evd.channel.id == config.channel) {
                chat.emit('discord', sender.username, sender.discriminator, msg)
            }
        }
    }

}

async function ingame(client, chat){
    chat.on('inGame', (sender, msg) => {
        client.guilds.fetch(config.guild).then(async guild => {
            const channel = await guild.channels.fetch(config.channel)
            channel.send(`[In Game] **${sender}**: ${msg}`)
        })
    })
}

module.exports = { ingame, worlddc };