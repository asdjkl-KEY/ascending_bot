const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const slashCommands = [];
let slashs = [];
const slashCommandsFiles = fs.readdirSync(path.join(__dirname, '../slashCommands')).filter(file => file.endsWith('.js'));

for (const file of slashCommandsFiles){
    const command = require(path.join(__dirname, '../slashCommands/', `/${file}`));
    slashCommands.push(command.data.toJSON());
    slashs.push(command.name);
}

const rest = new REST({ version: '10' }).setToken(process.env['TOKEN']);

module.exports = {
    run: async() => {
        try {
            console.log('Started refreshing application (/) commands.'.yellow);
            await rest.put(
                Routes.applicationCommands(process.env['CLIENT_ID']),
                { body: slashCommands },
            );
            console.log('Successfully reloaded application (/) commands.'.green);
        } catch (err){
            console.error(err);
        }
    },
    slashCommands: slashs
}