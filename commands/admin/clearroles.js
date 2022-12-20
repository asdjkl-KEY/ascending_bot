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
        let roles = message.guild.roles.cache;
        let count = 0;
        //confirmation with reaction
        let embed = new R.embed()
        .setTitle('¿Estás seguro?')
        .setDescription('Si reacciona con ✅, todos los roles serán eliminados.')
        .setColor('#fcfc00')
        .setFooter({text: 'pedido por: '+message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setTimestamp()
        let msg = await message.channel.send({embeds: [embed]})
        await msg.react('✅');
        await msg.react('❌');
        let filter = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
        }
        let collector = msg.createReactionCollector({filter, time: 60000});
        collector.on('collect', async (reaction, user) => {
            if(reaction.emoji.name === '✅' && user.id === message.author.id){
                collector.stop();
                try{
                    msg.delete();
                } catch (err) {
                    console.log(err);
                }
                await clearRoles();
            }else if(reaction.emoji.name === '❌' && user.id === message.author.id){
                collector.stop();
                try {
                    msg.delete();
                } catch (err) {
                    console.log(err);
                }
                message.channel.send({content: 'Comando cancelado.'});
            }
        })
        async function clearRoles(){
            roles.forEach(async role => {
                role.delete()
                .then(deleted => {
                    console.log(`Eliminado el rol ${deleted.name}`)
                    count++;
                })
                .catch(err => console.log(err));
            });
            message.channel.send({content: "**"+count+"**"+' Roles eliminados.'});
        }
    }
}