const { SlashCommandBuilder, messageLink } = require('discord.js');
const { Database } = require('jesscode-lib');
const ranks = new Database('ranks');
const { createCanvas, loadImage } = require('canvas')
const ctx = createCanvas(1000, 500).getContext('2d');
const path = require('path');
const fs = require('fs');
let levels = [0, 100, 200, 500, 700, 1000, 1300, 1500, 1700, 2000, 2500, 2800, 3200, 3500, 3800, 4100, 4600, 4900, 5200, 5700, 6000, 6300, 6800, 7100, 7400, 7900, 8200, 8700, 9000, 9500, 10000]

module.exports = {
    name: 'rank',
    category: 'admin',
    data: new SlashCommandBuilder()
        .setName('rank') // Nombre del comando.
        .setDescription('Muestra tu rango o el de un usuario') // Descripción del comando.
        .addUserOption(option => option.setName('usuario').setDescription('Usuario').setRequired(false)), // Opción de usuario.
        // .addStringOption(option => option.setName('reason').setDescription('REASON_DESCRIPTION').setRequired(true)), // Opción de texto.
    async execute(interaction, client, R){
        await (async () => {
            // Aquí el código del comando.
        let g = await R.Databases.general.get(interaction.guild.id);
        if(!g || !g['xpactived']) return interaction.reply({ content: 'El sistema de xp no está activado en este servidor. Usa `!xp on` para activarlo.', ephemeral: true });
        const user = interaction.options.getUser('usuario') || interaction.user;
        if(!ranks.has(interaction.guild.id)){
            ranks.set(interaction.guild.id, {});
        }
        if(!ranks.has(interaction.guild.id)){
            ranks.set(interaction.guild.id, {});
        }
        let guild = await ranks.get(interaction.guild.id);
        if(!guild[user.id]){
            guild[user.id] = {
                xp: 0,
                level: 0
            }
            ranks.set(interaction.guild.id, guild);
        }
        //set the background
        let background = await loadImage(R.links.bg[3]);
        ctx.drawImage(background, 0, 0, 1000, 500);
        //set the name
        ctx.font = 'bold 50px sans-serif';
        ctx.fillStyle = '#333333';
        ctx.fillText(interaction.options.getUser('usuario') ? interaction.options.getUser('usuario') : interaction.user.tag, 420, 150);
        //set the level
        ctx.font = 'bold 50px sans-serif';
        ctx.fillStyle = '#333333';
        ctx.fillText("LEVEL: "+ await (async () => {
            return ((await ranks.get(interaction.guild.id))[user.id].level)
        })(), 420, 250);
        //set the xp
        ctx.font = 'bold 50px sans-serif';
        ctx.fillStyle = '#0009';
        ctx.fillText("XP: "+await (async () => {
            return ((await ranks.get(interaction.guild.id))[user.id].xp)
        })()+"/"+await(async () => {
            return (levels[parseInt((await ranks.get(interaction.guild.id))[user.id].level)+1])
        })(), 420, 350);
        //set the rounded progress bar
        ctx.fillStyle = '#555';
        ctx.fillRect(100, 420, 800, 35);
        ctx.beginPath();
        ctx.arc(900, 437.5, 17.5, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#ff3cf7';
        ctx.fillRect(100, 420, 800*await(async () => {
            return ((parseInt((await ranks.get(interaction.guild.id))[user.id].xp)/levels[parseInt((await ranks.get(interaction.guild.id))[user.id].level)+1]));
        })(), 35);
        ctx.beginPath();
        ctx.arc(100, 437.5, 17.5, Math.PI *2, 0, true);
        ctx.closePath();
        ctx.fill();
        //clip the avatar
        ctx.beginPath();
        ctx.arc(200, 225, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        //set the avatar on canvas in circle mode
        let avatar = await loadImage(user.displayAvatarURL({extension: 'png', size: 1024}));
        ctx.drawImage(avatar, 100, 125, 200, 200);
        //replace white color in canvas with skyblue
        let imgData = ctx.getImageData(0, 0, 1000, 500);
        for (let i = 0; i < imgData.data.length; i += 4) {
            if (imgData.data[i] === 255 && imgData.data[i + 1] === 255 && imgData.data[i + 2] === 255) {
                imgData.data[i + 3] = 0;
            }
        }
        //convert the canvas to a buffer
        let buffer = ctx.canvas.toBuffer();
        //write the buffer to a file
        fs.writeFileSync(path.join(__dirname, '..', 'rank.png'), buffer);
        //send the file
        interaction.reply({ files: [path.join(__dirname, '..', 'rank.png')] });
        //clear canvas
        ctx.clearRect(0, 0, 1000, 500);
        //delete the file
        setTimeout(() => {
            fs.unlinkSync(path.join(__dirname, '..', 'rank.png'));
        }, 1000)
        })()

    }
}