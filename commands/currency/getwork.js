//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'getwork',
    alias: ['obtener-trabajo'],
    permissions: [],
    category: 'currency',
    description: 'Con este comando puedes obtener un trabajo.',
    usage: '<prefix> getwork <trabajo>',
    async execute(client, message, args, R){
        let jobs = ['doctor', 'minero', 'ladron', 'constructor', 'bombero', 'policia'];
        let job = args[0];
        if(!job) return message.reply('Debes especificar un trabajo.');
        if(!jobs.includes(job)) return message.reply('Ese trabajo no existe. Las opciones disponibles son: `doctor`, `minero`, `ladron`, `constructor`, `bombero`, `policia`');
        let db = R.Databases.ranks;
        let e = R.emojis;
        let guild = await db.get(message.guild.id);
        if(!guild) return message.reply('No hay datos para mostrar.');
        if(Object.keys(guild). length === 0) return message.reply('No hay datos para mostrar.');
        let info = guild[message.author.id];
        if(!info) return message.reply('No hay datos para mostrar.');
        if(info.work){
            if(info.work.current) return message.reply('Ya tienes un trabajo.');
        }
        let salaries = {
            doctor: [500, 1500],
            minero: [500, 2000],
            bombero: [500, 2000],
            policia: [500, 1500],
            constructor: [500, 2500],
            ladron: [500, 1500]
        }
        if(!info.work) info.work = {};
        info.work.current = job;
        info.work.salary = salaries[job];
        guild[message.author.id] = info;
        await db.set(message.guild.id, guild);
        let embed = new R.embed()
            .setColor('#00fc00')
            .setTitle(`👨‍🔧 Trabajo de ${message.author.tag} 👨‍🔧`)
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`
            **${e[job]} Trabajo:** \`${job}\`
            `)
            message.reply({embeds: [embed]})
    }
}