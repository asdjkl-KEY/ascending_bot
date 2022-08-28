const { EmbedBuilder } = require('discord.js');
const { botProperties } = require('./database');
const { Database } = require('jesscode-lib');
const cool = new Database('cooldown');

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
const convertTime = async(time) => {
    console.log(time)
    time = parseInt(time) - Date.now()
    let d = [0,0]
    let h = [0,0];
    let min = [0,0];
    let s = [0,0];

    let timeInHour;
    let timeInMin;
    let timeInS;
    // if(!time) return new Error('missing time');
    if(isNaN(time)) return new Error('the time provided must be a number');
    if(time > 3600000){
        timeInHour = Math.floor(time/3600000);
        if(timeInHour > 9){
            timeInHour = timeInHour.toString();
            h[0] = parseInt(timeInHour[0]);
            h[1] = parseInt(timeInHour[1]);
        } else {
            h[1] = parseInt(timeInHour);
        }
    }
    if(time > 60000){
        timeInMin = Math.floor(time/60000);
        if(timeInMin > 9){
            timeInMin = timeInMin.toString();
            min[0] = parseINt(timeInMin[0]);
            min[1] = parseInt(timeInMin[1]);
        } else {
            min[1] = parseInt(timeInMin)
        }
    }
    if(time > 1000){
        timeInS = Math.floor(time/1000);
        if(timeInS > 9){
            timeInS = timeInS.toString();
            s[0] = parseInt(timeInS[0]);
            s[1] = parseInt(timeInS[1]);
        } else {
            s[1] = parseInt(timeInS);
        }
    }
    let payload = ''
    if(h[0] > 0 && h[1] > 0 || h[1] > 0){
        payload = `${h[0]+h[1]+'h'}`
        return payload;
    }
    if(min[0]>0 && min[1]>0 || min[1]>0){
        payload = `${min[0]+min[1]+'min'}`;
        return payload;
    }
    if(s[0] > 0 && s[1] > 0 || s[1]>0){
        payload = `${s[0]+s[1]+'s'}`;
        return payload;
    }
    return payload;
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