//R son los recursos enviados desde el handler.
const { loadImage, createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');
const canvas = createCanvas(251, 50);
let font = 'assets/font.ttf';

module.exports = {
    name: 'machievement',
    alias: ['ma'],
    category: 'diversion',
    description: 'Logro de Minecraft',
    usage: '<prefix> machievement <texto>',
    async execute(client, message, args, R){
        message.delete();
        let text = args.join(' ');
        if(!text) return message.reply({content: 'Debes especificar un texto.', ephemeral: true});
        if(text.length > 23) return message.reply({content: 'El texto no puede tener más de 23 caracteres.', ephemeral: true});
        if(text.length < 3) return message.reply({content: 'El texto no puede tener menos de 3 caracteres.', ephemeral: true});
        let bg = await loadImage(R.links.bg[4]);
        let ctx = canvas.getContext('2d');
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        //register font
        registerFont(font, { family: 'Minecraft', weight: 'normal', style: 'normal' });
        ctx.font = '14px Minecraft';
        //yellow text
        ctx.fillStyle = '#fff200';
        ctx.fillText("Logro Desbloqueado!", 52, 20);
        //white text
        ctx.font = '14px Minecraft';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(args.join(' '), 52, 40);
        //icon blur removed
        let icon = await loadImage(R.links.icons[Math.floor(Math.random() * R.links.icons.length)]);
        ctx.drawImage(icon, 10, 10, 32, 32);
        //buffer
        let buffer = canvas.toBuffer();
        //write file
        fs.writeFileSync(path.join(__dirname, '/logro.png'), buffer);
        //send file
        message.channel.send({ files: [path.join(__dirname, '/logro.png')] });
        //delete file
        setTimeout(() => {
            fs.unlinkSync(path.join(__dirname, 'logro.png'));
        }, 5000)
    }
}