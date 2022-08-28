const { EmbedBuilder } = require('discord.js');
const { botProperties } = require('./database');
const { Database } = require('jesscode-lib');
const cool = new Database('cooldown');
const convertTime = require('./convertTime.js');

class _ET{
    constructor(data){
        if(data.color !== 'random' && !data.color.startsWith('#')){
            data.color = 'random';
        }
        this.color = data.color === 'random' ? Math.floor(Math.random() * 16777215).toString(16) : data.color;
        this.title = data.title;
        this.description = data.description
        this.message = data.message;
        this.setEmbedProperties();
    }
    async setEmbedProperties(){
        this.embed = new EmbedBuilder();
        this.embed.setColor(this.color)
        this.embed.setTitle(this.title)
        this.embed.setDescription(this.description)
        this.embed.setFooter({ text: `Powered by A-Devs Studio`, iconURL: await botProperties.get('icon')})
    }
    send(channel){
        if(channel === 'private'){
            return this.message.author.send({embeds: [this.embed]});
        }
        this.message.channel.send({embeds: [this.embed]});
    }
}

const setCooldown = (cooldown, topic) => {
    if(!cooldown) return new Error('No cooldown provided');
    if(isNaN(cooldown)) return new Error('The cooldown provided isNaN');
    if(cooldown <= 0) return new Error("the cooldown provided must not be less than or equal to 0");
    if(!topic) return new Error('No topic provided');
    if(typeof topic !== 'string') return new Error('The topic provided must be a string');
    cool.set(topic, Date.now() + cooldown);
}
const hasCooldown = async(topic) => {
    if(!topic) return new Error('No topic provided');
    if(typeof topic !== 'string') return new Error('The topic must be a string');
    if(!cool.has(topic)) return false;
    if(await cool.get(topic) <= Date.now()){
        cool.remove(topic);
        return false;
    }
    if(await cool.get(topic) > Date.now()) return true;
}

const replyCooldown = async(message, topic) => {
    if(!message || !topic) return new Error('missing data');
    let cooldown = await cool.get(topic);
    if(!await hasCooldown(topic)) return;
    let waitcool = await convertTime(cooldown);
    let embed = new EmbedBuilder()
    .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL()})
    .setColor('#fc0000')
    .setDescription(`Debes esperar **${waitcool}** para usar este comando`)
    .setTimestamp()
    .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL()});

    return message.reply({embeds: [embed]});
}

module.exports = { _ET, setCooldown, replyCooldown, hasCooldown }