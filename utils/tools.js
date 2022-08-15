const { EmbedBuilder } = require('discord.js');
const { botProperties } = require('./database');
//const { Database } = require('jesscode-lib');
//const db = new Database('<name>');


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

module.exports = { _ET }