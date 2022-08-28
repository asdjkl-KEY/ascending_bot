const { GatewayIntentBits, Client, Collection, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, 32509] });
client.properties = {};
client.properties.token = process.env['TOKEN'];
const { botProperties } = require('../utils/database');
if(!botProperties.has('prefix')) {
    botProperties.set('prefix', '!');
}
const { Database } = require('jesscode-lib');
const db = new Database('currency');
const inventory = new Database('bags');
client.commands = new Collection();

client.on('messageCreate', async (message) => {
    const prefix = await botProperties.get('prefix');
    const user = message.author;
    if(!db.has(`${user.id}`)){
        db.set(`${user.id}`, {
            bank: 0,
            wallet: 0
        });
    }
    if(!inventory.has(`${user.id}`)){
        inventory.set(`${user.id}`, [])
    }
    if(message.author.bot || message.channel.type === 'DM') return;
    if(!message.content.trim().startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(!command) return message.reply('No se obtuvo ningún comando.');
    const cmd = client.commands.get(command) || client.commands.find(c => c.name && c.alias.includes(command));
    if(!cmd) {
        let embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('COMANDO INEXISTENTE')
            .setDescription(`El comando \`${command}\` no existe o está en desarrollo.`)
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        return message.channel.send({embeds: [embed]});
    }
    if(cmd){
        if(cmd.category === 'private' && parseInt(message.author.id) !== await botProperties.get('ownerID')){
            return;
        }
        cmd.execute(client, message, args);
    }
})
client.on('ready', async() => {
    const prefix = await botProperties.get('prefix');
    const states = [prefix+"help", "Ascendiendo", "The One"]
    let setPresence = {
        run:async(client) => {
          setTimeout(() => { client.user.setActivity(states[Math.floor(Math.random() * states.length)]);
          setTimeout(() => {
            setPresence.run(client);
          }, 10000)
          }, 10000)
        }
      }
    setPresence.run(client);
    console.log("Bot is Ready!!")
})


module.exports = client;