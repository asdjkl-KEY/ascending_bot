let link = 'https://discord.com/oauth2/authorize?client_id=1008394723460911207&scope=bot&permissions=8'
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'invite',
    category: 'private',
    data: new SlashCommandBuilder()
        .setName('invite') // Nombre del comando.
        .setDescription('Enviar enlace de invitación'), // Descripción del comando.
        // .addUserOption(option => option.setName('user').setDescription('USER_DESCRIPTION').setRequired(true)) // Opción de usuario.
        // .addStringOption(option => option.setName('reason').setDescription('REASON_DESCRIPTION').setRequired(true)), // Opción de texto.
    async execute(interaction, client, R){
        // Aquí el código del comando.
        let embed = new R.embed()
        .setTitle('Gracias por invitarme a tu servidor!')
        .setDescription(`[Invitame aquí] (${link})`)
        .setColor('#fcfc00')

        await interaction.reply({embeds: [embed]});
    }
}