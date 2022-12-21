//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'delete-role',
    alias: ['deleterole'],
    permissions: [p.ManageRoles],
    category: 'admin',
    description: 'Con este comando puedes eliminar un rol específico.',
    usage: '<prefix> delete-role <nombre/id>',
    async execute(client, message, args, R){
        let nameOrId = args[0];
        if(!nameOrId) return message.reply('Debes especificar el nombre o id del rol.');
        let role = message.guild.roles.cache.find(r => r.name === nameOrId || r.id === nameOrId);
        if(!role) return message.reply('No se encontró el rol especificado.');
        role.delete().then(() => {
            message.reply("Rol Eliminado con éxito!")
        }).catch(err => message.reply('No se pudo eliminar el rol, al parecer pertenece a un bot o está en una posición mas alta que el mío.'))
    }
}