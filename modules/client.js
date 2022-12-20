const { GatewayIntentBits, Client, Collection, EmbedBuilder, PermissionsBitField, Events } = require('discord.js');
const client = new Client({ intents: [3276799] });
client.properties = {};
client.properties.token = process.env['TOKEN'];
const BotProperties = require('../helpers/botProperties.json');
const { Database } = require('jesscode-lib');
client.commands = new Collection();
const { cooldown } = require('../utils/tools');
const general = new Database('General_Database');
const registers = new Database('registers');
const Shop = new Database('shop');
const links = require('../helpers/links.js');
const axl = require('app-xbox-live');
const { slashCommands } = require('./slashHandler');
const path = require('path');
let levels = [0, 100, 200, 500, 700, 1000, 1300, 1500, 1700, 2000, 2500, 2800, 3200, 3500, 3800, 4100, 4600, 4900, 5200, 5700, 6000, 6300, 6800, 7100, 7400, 7900, 8200, 8700, 9000, 9500, 10000]
const ranks = new Database('ranks');
let p = PermissionsBitField.Flags;
const { ingame, worlddc } = require('../realmAPI/worlddc.js');

client.on('messageCreate', async (message) => {
    const xl = await axl.Login('j.tu.jess04@gmail.com', process.env["XBOX"]);
    const prefix = BotProperties.prefix;
    const user = message.author;
    worlddc(message);
    ingame(client);
    if(message.author.bot || message.channel.type === 'DM') return;
    // XP SYSTEM
    if(!general.has(message.guild.id)){
        general.set(message.guild.id, {});
    }
    let g = await general.get(message.guild.id);
    if(g['xpactived']){
        if(!ranks.has(message.guild.id)){
            ranks.set(message.guild.id, {});
        }
        let guild = await ranks.get(message.guild.id);
        if(!guild[user.id]){
            guild[user.id] = {
                level: 0,
                xp: 0
            }
            ranks.set(message.guild.id, guild);
        }
        let xp = message.content.length;
        let finalXP = Math.floor(Math.random() * xp/10 * 7);
        guild[user.id] = {
            level: guild[user.id].level,
            xp: guild[user.id].xp + finalXP
        }
        if(guild[user.id].xp >= levels[guild[user.id].level + 1]){
            guild[user.id] = {
                level: guild[user.id].level + 1,
                xp: guild[user.id].xp - levels[guild[user.id].level]
            }
        }
        ranks.set(message.guild.id, guild);
        if(g['logslevel']){
            let channel = client.channels.cache.get(g['logslevel']);
            if(channel){
                let embed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle('LEVEL UP!')
                    .setDescription(`El usuario ${user} ha subido de nivel.`)
                    .addField('Nivel anterior:', guild[user.id].level - 1)
                    .addField('Nivel actual:', guild[user.id].level)
                    .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
                channel.send({embeds: [embed]});
            }
        }
    } //end xp system
    if(!message.content.trim().startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(!command) return message.reply('No se obtuvo ningún comando.');
    const cmd = client.commands.get(command) || client.commands.find(c => c.name && c.alias.includes(command));
    if(!cmd) {
        let g = await general.get(message.guild.id);
        if(g && g.nocomands) return;
        let embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('COMANDO INEXISTENTE')
            .setDescription(`El comando __**\`${command}\`**__ no existe o está en desarrollo.`)
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        return message.channel.send({embeds: [embed]});
    }
    if(cmd){
        if(cmd.category === 'private' && parseInt(message.author.id) !== BotProperties.ownerID){
            return;
        }
        if(cmd.permissions){
            if(cmd.permissions.length > 0){
                let perms = cmd.permissions;
                let hasPerms = true;
                perms.forEach(perm => {
                    if(!message.member.permissions.has(perm)){
                        hasPerms = false;
                    }
                });
                if(!hasPerms){
                    let embed = new EmbedBuilder()
                        .setColor('#ff0000')
                        .setTitle('PERMISOS INSUFICIENTES')
                        .setDescription(`No tienes los permisos necesarios para ejecutar este comando.`)
                        .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
                    return message.channel.send({embeds: [embed]});
                }
            }
        }
            cmd.execute(client, message, args, {
                BotProperties,
                Databases: { general, Shop, registers },
                embed: EmbedBuilder,
                links,
                xl,
                cooldown
            }).then(() => {})
            .catch(err => console.log(err));
    }
})
client.on('ready', async() => {
    const prefix = BotProperties.prefix;
    const states = [prefix+"help", "Ascendiendo"]
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
client.on('interactionCreate', async (interaction) => {
    if(interaction.isCommand()){
        const command = slashCommands.includes(interaction.commandName) ? require(path.join(__dirname,`../slashCommands/${interaction.commandName}.js`)) : null;
        if(!command) return interaction.reply({content: 'Comando no encontrado.', ephemeral: true});
        if(command.category === 'private' && parseInt(interaction.user.id) !== BotProperties.ownerID){
            return interaction.reply({content: 'Este comando es Privado', ephemeral: true});
        }
        command.execute(interaction, client, {
            BotProperties,
            Databases: { general, Shop, registers },
            embed: EmbedBuilder,
            links,
            cooldown
        });
    }
});
client.on(Events.GuildMemberRemove, async member => {
    let g = await general.get(member.guild.id);
    if(g){
        if(g['leavesactived']){
            if(!g.leaves){
                g.leaves = 1;
            } else {
                g.leaves = g.leaves + 1;
            }
        }
    } else {
        general.set(member.guild.id, {
            leavesactived: false,
            leaves: 0
        })
    }
})


module.exports = { client }