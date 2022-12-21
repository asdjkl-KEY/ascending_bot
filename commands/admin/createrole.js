//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'create-role',
    alias: ['createrole'],
    permissions: [p.ManageRoles],
    category: 'admin',
    description: 'Con este comando puedes crear un rol',
    usage: '<prefix> create-role <nombre> <color(hex)> <posición>',
    async execute(client, message, args, R){
        let name = args[0];
        let color = args[1];
        let position = args[2];
        if(!name) return message.reply('Debes especificar el nombre del rol.');
        if(!color) return message.reply('Debes especificar el color del rol.');
        if(!position) return message.reply('Debes especificar la posición del rol.');
        if(isNaN(parseInt(position))) return message.reply('La posición del rol debe ser un número.');
        if(parseInt(position) > 250) return message.reply('La posición del rol no puede ser mayor a 250.');
        if(parseInt(position) < 0) return message.reply('La posición del rol no puede ser menor a 0.');
        let role = await message.guild.roles.create({}).then(r => {
            r.edit({
                name: name,
                color: color,
                position: parseInt(position)
            });
            message.reply(`Se creó el rol **${name}**.`);
        });
    }
}