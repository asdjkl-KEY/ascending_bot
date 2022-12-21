const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
let bgURL = 'https://media.discordapp.net/attachments/926992209532825610/1054981433338363985/bg_bggenerator_com_3.png'
module.exports = async (msg, user) => {
    //divide msg if it's too long
    let msg1 = '';
    let msg2 = '';
    let msg3 = '';
    for(let i = 0; i < msg.length; i++){
        msg = msg.replace("*", '');
    }
    if(msg.length > 40) {
        msg1 = msg.slice(0, 40);
        msg2 = msg.slice(40, 80);
        msg3 = msg.slice(80, 120);
    }
    
    const canvas = createCanvas(700, 250);
    const ctx = canvas.getContext('2d');
    //set the background
    const background = await loadImage(bgURL);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    //set the title
    ctx.font = '30px bold sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText('Bienvenid@!!', 250, 50);
    //set the message
    ctx.font = '20px bold sans-serif';
    ctx.fillStyle = '#fff';
    if(msg2.length > 0){
        ctx.fillText(msg1, 250, 150);
        ctx.fillText(msg2, 250, 180);
        if(msg3.length > 0){
            ctx.fillText(msg3, 250, 210);
        }
    } else {
        ctx.fillText(msg1, 250, 150);
    }
    //set the avatar in a circle
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    //set the avatar
    const avatar = await loadImage(user.displayAvatarURL({ extension: 'png' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);
    //buffer the canvas
    const buffer = canvas.toBuffer('image/png');
    //write the buffer to a file
    fs.writeFileSync(path.join(__dirname, '..', 'assets', 'welcome.png'), buffer);
    //return the file path;
    return path.join(__dirname, '..', 'assets', 'welcome.png');
}