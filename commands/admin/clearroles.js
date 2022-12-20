//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'clear-roles',
    alias: ['crs'],
    permissions: [p.Administrator],
    category: 'private',
    description: 'Con este comando puedes eliminar todos los roles del servidor.',
    usage: '<prefix> clear-roles',
    async execute(client, message, args, R){
        let roles = message.guild.roles.cache
        roles.forEach(async role => {
            await role.delete();
        });
        message.channel.send({content: 'Roles eliminados.'});
    }
}