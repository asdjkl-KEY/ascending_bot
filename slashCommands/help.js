const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'help',
    category: 'info',
    data: new SlashCommandBuilder()
        .setName('help') // Nombre del comando.
        .setDescription('Obtnén ayuda con los comandos del bot'), // Descripción del comando.
        // .addUserOption(option => option.setName('user').setDescription('USER_DESCRIPTION').setRequired(true)) // Opción de usuario.
        // .addStringOption(option => option.setName('reason').setDescription('REASON_DESCRIPTION').setRequired(true)), // Opción de texto.
    async execute(interaction, client, R){
        let categories = ['admin', 'diversion', 'utilidad', 'owner'];
        let commands = {};
        categories.forEach(c => {
            let files = fs.readdirSync(path.join(__dirname, `../commands/${c}/`)).filter(f => f.endsWith('.js'));
            commands[c] = [];
            files.map(f => {
                let command = require(path.join(__dirname, `../commands/${c}/${f}`));
                if(command.category !== 'private') commands[c].push(command.name);
            });
        });
        // Aquí el código del comando.
        let description = '';
        Object.keys(commands).forEach(k => {
            description += `**${k}**\n${commands[k].join(', ')}\n\n`;
        })
        let rowoptions = [];
        Object.keys(commands).forEach(k => {
            rowoptions.push({label: k, value: k, description: `Comandos de ${k}`});
        });
        let row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('help')
                    .setPlaceholder('Selecciona una categoría')
                    .addOptions(rowoptions)
            );
        const embed = new R.embed()
        .setTitle('Comandos')
        .setDescription(`
        Comandos del bot.
        ${description}
        `)
        .setColor("#fafa00")
        .setTimestamp()
        .setFooter({text: "Para mas información usa !help <comando>"})
        .setThumbnail(client.user.displayAvatarURL());

        interaction.reply({embeds: [embed], components: [row]});
        //wait for select menu
        const filter = i => i.customId === 'help' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async i => {
            let category = i.values[0];
            let description = '';
            commands[category].forEach(c => {
                description += `\`${c}\`\n`;
            });
            const embed = new R.embed()
            .setTitle(category)
            .setDescription(description)
            .setColor("#fafa00")
            .setFooter({text: "Para mas información usa !help <comando>"})
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL());
            i.update({embeds: [embed]});
        });
        //trigger change menu
        collector.on('end', async collected => {
            let embed = collected.first().message.embeds[0];
            embed.setFooter({text: "Tiempo de espera agotado."});
            collected.first().update({embeds: [embed]});
        })
    }
}