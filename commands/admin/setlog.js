//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
const p = PermissionsBitField.Flags;
module.exports = {
    name: 'setlog',
    alias: [],
    category: 'admin',
    permissions: "MANAGE_GUILD",
    description: 'Con este comando puedes establecer un canal de logs para el servidor',
    usage: '<prefix> setlog <#canal>',
    async execute(client, message, args, R){
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if(!channel) return message.reply('Debes mencionar !message.channel.permissionsFor(message.guild.members.me)un canal.');
        if(channel.type != 0) {
            console.log(channel.type);
            return message.reply('Debes mencionar un canal de texto.');
        }
        if(
            !message.channel.permissionsFor(message.guild.members.me).has(p.SendMessages) ||
            !message.channel.permissionsFor(message.guild.members.me).has(p.ViewChannel) ||
            !message.channel.permissionsFor(message.guild.members.me).has(p.EmbedLinks) ||
            !message.channel.permissionsFor(message.guild.members.me).has(p.AttachFiles) ||
            !message.channel.permissionsFor(message.guild.members.me).has(p.ReadMessageHistory) ||
            !message.channel.permissionsFor(message.guild.members.me).has(p.AddReactions) ||
            !message.channel.permissionsFor(message.guild.members.me).has(p.UseExternalEmojis) ||
            !message.channel.permissionsFor(message.guild.members.me).has(p.ManageMessages) ||
            !message.channel.permissionsFor(message.guild.members.me).has(p.ManageWebhooks) ||
            !message.channel.permissionsFor(message.guild.members.me).has(p.ManageChannels) ||
            !message.channel.permissionsFor(message.guild.members.me).has(p.ManageRoles) ||
            !message.channel.permissionsFor(message.guild.members.me).has(p.ManageThreads) ||
            !message.channel.permissionsFor(message.guild.members.me).has(p.UseExternalStickers)
        ){
            let missingPermissions = [
                !message.channel.permissionsFor(message.guild.members.me).has(p.SendMessages) ? 'ENVIAR MENSAJES' : '',
                !message.channel.permissionsFor(message.guild.members.me).has(p.ViewChannel) ? 'VER CANAL' : '',
                !message.channel.permissionsFor(message.guild.members.me).has(p.EmbedLinks) ? 'ENVIAR EMBEDS' : '',
                !message.channel.permissionsFor(message.guild.members.me).has(p.AttachFiles) ? 'ADJUNTAR ARCHIVOS' : '',
                !message.channel.permissionsFor(message.guild.members.me).has(p.ReadMessageHistory) ? 'LEER HISTORIAL DE MENSAJES' : '',
                !message.channel.permissionsFor(message.guild.members.me).has(p.AddReactions) ? 'AÑADIR REACCIONES' : '',
                !message.channel.permissionsFor(message.guild.members.me).has(p.UseExternalEmojis) ? 'USAR EMOJIS EXTERNOS' : '',
                !message.channel.permissionsFor(message.guild.members.me).has(p.ManageMessages) ? 'GESTIONAR MENSAJES' : '',
                !message.channel.permissionsFor(message.guild.members.me).has(p.ManageWebhooks) ? 'GESTIONAR WEBHOOKS' : '',
                !message.channel.permissionsFor(message.guild.members.me).has(p.ManageChannels) ? 'GESTIONAR CANALES' : '',
                !message.channel.permissionsFor(message.guild.members.me).has(p.ManageRoles) ? 'GESTIONAR ROLES' : '',
                !message.channel.permissionsFor(message.guild.members.me).has(p.ManageThreads) ? 'GESTIONAR HILOS' : '',
                !message.channel.permissionsFor(message.guild.members.me).has(p.UseExternalStickers) ? 'USAR STICKERS EXTERNOS' : ''
            ];
            for(let per in missingPermissions){
                if(missingPermissions[per] == '') missingPermissions.splice(per, 1);
            }
            let description = '';
            for (let per of missingPermissions) {
                description += per === '' ? '' : `\`• ${per}\`\n`;
            }
            return message.reply(`FALTAN PERMISOS\n\n${description}`);
        }
        let db = R.Databases.general;
        let types = ['message', 'member', 'role', 'channel', 'guild', 'ban'];
        let type = args[1];
        if(!type) return message.reply('Debes especificar un tipo de log. Los tipos de logs son: `message`, `member`, `role`, `channel`, `guild`, `ban`');
        if(!types.includes(type)) return message.reply('Debes especificar un tipo de log válido. Los tipos de logs son: `message`, `member`, `role`, `channel`, `guild`, `ban`');
        if(db.has(message.guild.id)){
            let data = await db.get(message.guild.id);
            data[type] = channel.id;
            await db.set(message.guild.id, data);
            return message.reply(`El canal de logs de \`${type}\` ha sido establecido en ${channel}.`);
        } else {
            let data = {
                message: null,
                member: null,
                role: null,
                channel: null,
                guild: null,
                ban: null
            };
            data[type] = channel.id;
            await db.set(message.guild.id, data);
            return message.reply(`El canal de logs de \`${type}\` ha sido establecido en \`${channel}\`.`);
        }
    }
}