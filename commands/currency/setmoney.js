const { EmbedBuilder } = require('discord.js');
// const { botProperties } = require('../../utils/database');
const { Database } = require('jesscode-lib');
const db = new Database('currency');
let emotes = require('../../helpers/emotes.js');
const { setCooldown, hasCooldown, replyCooldown } = require('../../utils/tools.js');

module.exports = {
    name: 'setmoney',
    alias: ['setmoney'],
    category: 'private',
    description: 'Con este comando se establece la economia de alguien',
    usage: 'setmoney <cantidad> [usuario]',
    async execute(client, message, args){
        const user = message.mentions.users.first();
        if(!user) user = message.author;
        const quantity = args[0];
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('No tienes permiso para usar este comando. Permiso necesario: `ADMINISTRADOR`')
        if(user.id == client.user.id || user.id == message.guild.me.id) return message.reply('No puedes establecer mi economia')
        if(user.bot) return message.reply('El usuario es un bot y no se puede establecer una economia');
        if(!quantity) return message.reply('Especifica la cantidad a ser colocada');
        if(isNaN(parseInt(quantity))) return message.reply('El valor especificado no es un número');
        if(quantity <= 0 ) return message.reply('La cantidad no puede ser menor o igual a 0');
        let ballance = await db.get(`${user.id}`);
        ballance.wallet = quantity;
        db.set(`${user.id}`, ballance);
    }
}