const { GatewayIntentBits, Client, Collection, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, 32509] });
client.properties = {};
client.properties.token = process.env['TOKEN'];
const { BotProperties, Emotes, Dictionary } = require('../helpers/Export.js');
const { Database } = require('jesscode-lib');
const currency = new Database('currency');
const inventories = new Database('bags');
client.commands = new Collection();
const { setCooldown, hasCooldown, replyCooldown } = require('../utils/tools');
const general = new Database('General_Database');

client.on('messageCreate', async (message) => {
    const prefix = BotProperties.prefix;
    const user = message.author;
    if(message.author.bot || message.channel.type === 'DM') return;
    if(!currency.has(`${user.id}`)){
        currency.set(`${user.id}`, {
            bank: 0,
            wallet: 0
        });
    }
    if(!inventories.has(`${user.id}`)){
        inventories.set(`${user.id}`, {})
    }
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
        if(cmd.category === 'private' && parseInt(message.author.id) !== BotProperties.ownerID){
            return;
        }
        cmd.execute(client, message, args, {
            BotProperties,
            Emotes,
            Dictionary,
            hasCooldown,
            setCooldown,
            replyCooldown,
            Databases: { currency, inventories, general }
        });
    }
})
client.on('ready', async() => {
    const prefix = BotProperties.prefix;
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