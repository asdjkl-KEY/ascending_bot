//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'profile',
    alias: [],
    permissions: [],
    category: 'utils',
    description: 'Con este comando puedes saber la información de un usuario o la tuya.',
    usage: '<prefix> profile [usuario]',
    async execute(client, message, args, R){
        let user = message.mentions.users.first() || message.author;
        let date = {
            day: {
                "Mon": "Lunes",
                "Tue": "Martes",
                "Wed": "Miércoles",
                "Thu": "Jueves",
                "Fri": "Viernes",
                "Sat": "Sábado",
                "Sun": "Domingo"
            },
            month: {
                "Jan": "Enero",
                "Feb": "Febrero",
                "Mar": "Marzo",
                "Apr": "Abril",
                "May": "Mayo",
                "Jun": "Junio",
                "Jul": "Julio",
                "Aug": "Agosto",
                "Sep": "Septiembre",
                "Oct": "Octubre",
                "Nov": "Noviembre",
                "Dec": "Diciembre"
            }
        }
        let cAt = `${user.createdAt}`.split(" ");
        let createdAt = `${date.day[cAt[0]]}, ${cAt[2]} de ${date.month[cAt[1]]} de ${cAt[3]} a las ${cAt[4]}`;
        let jAt = `${message.guild.members.cache.get(user.id).joinedAt}`.split(" ");
        let joinedAt = `${date.day[jAt[0]]}, ${jAt[2]} de ${date.month[jAt[1]]} de ${jAt[3]} a las ${jAt[4]}`;

        let embed = new R.embed()
            .setColor('#ff0000')
            .setTitle(`Perfil de ${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setFields(
                { name: 'Nombre de usuario', value: user.username, inline: true },
                { name: 'Tag', value: user.tag, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: 'Bot', value: user.bot ? "Verdadero" : "Falso", inline: true },
                { name: 'Roles', value: message.guild.members.cache.get(user.id).roles.cache.map(r => r).join(' '), inline: true },
                { name: 'Nickname', value: message.guild.members.cache.get(user.id).nickname ? message.guild.members.cache.get(user.id).nickname : "Ninguno", inline: true },
                { name: 'Cuenta creada el', value: createdAt, inline: true },
                { name: 'Se unió a este servidor el', value: joinedAt, inline: true}

            )
            .setFooter({ text: `pedido por: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });
        message.channel.send({embeds: [embed]});
    }
}