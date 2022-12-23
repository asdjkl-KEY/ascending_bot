const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'test',
    data: new SlashCommandBuilder()
        .setName('ping') // Nombre del comando.
        .setDescription('Responde con Pong!'), // Descripción del comando.
        // .addUserOption(option => option.setName('user').setDescription('USER_DESCRIPTION').setRequired(true)) // Opción de usuario.
        // .addStringOption(option => option.setName('reason').setDescription('REASON_DESCRIPTION').setRequired(true)), // Opción de texto.
    async execute(interaction, client, R){
        // Aquí el código del comando.
        await interaction.reply('Pong!');
    }
}