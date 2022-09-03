const { EmbedBuilder } = require('discord.js');
const { botProperties } = require('../../utils/database');
const { Database } = require('jesscode-lib');
const db = new Database('currency');
const inventory = new Database('bags');
let emotes = require('../../helpers/emotes.js');
const { setCooldown, hasCooldown, replyCooldown } = require('../../utils/tools.js');

function hasPick(object){
    if(object.pickaxe) return true;
    return false;
}
function pickDown(object){
     if(object.pickaxe.uses > 0) return true;
     return false;
}

module.exports = {
    name: 'mine',
    alias: [''],
    category: 'currency',
    description: 'Con este comando si eres minero podras obtener una fuente de ingresos adicional',
    usage: 'mine',
    async execute(client, message, args){
        const user = message.author;
        const topic = `${user.id}:mine`;
        const ores = [
            'cobblestone', 'cobblestone', 'cobblestone','gold', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone',
            'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone',
            'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone',
            'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone',
            'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone',
            'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone',
             'iron', 'iron', 'iron', 'iron', 'iron', 'iron', 'gold', 'rocavital'];
        let oresBal = {
            cobblestone: 10,
            iron: 5,
            gold: 3,
            rocavital: 2
        }
        let names = {
            cobblestone: 'Roca',
            iron: 'Hierro',
            gold: 'Oro',
            rocavital: 'Roca Vital'
        }
        if(await hasCooldown(topic)){
            return replyCooldown(message, topic)
        }
        let ore = ores[Math.floor(Math.random() * ores.length)];
        let quantity = Math.floor(Math.random() * oresBal[ore]) +1;
        let coins = Math.floor(Math.random() * 100) +1;
        let ballance = await db.get(`${user.id}`);
        let bag = await inventory.get(`${user.id}`);
        if(!ballance.job || ballance.job !== 'miner') return message.reply('No eres minero o no tienes una profesion usa `getjob <trabajo>` o `changejob <trabajo>`')
        if(!hasPick(bag)) return message.reply('No tienes un pico para minar, usa `buy pickaxe`');
        if(!pickDown(bag)) return message.reply('Tu pico no se puede usar más, usa `repair pickaxe` para repararlo');
        let embed = new EmbedBuilder()
        .setTitle('Mina')
        .setAuthor({name: user.username, iconURL: user.displayAvatarURL()})
        .setColor('#00fc00')
        .setDescription(`Has entrado en la mina y has recolectado ${emotes[ore]} **${names[ore]} x${quantity*2}** el Estado se quedó con la mitad y te han pagado ${emotes.coin} **${coins} Bahrs** por ello`)
        .setTimestamp()
        .setFooter({text: user.tag, iconURL: user.displayAvatarURL()});
        bag.pickaxe.uses--;
        if(bag[ore]){
            bag[ore].quantity += quantity;
        }
        if(!bag[ore]){
            bag[ore] = {
                quantity: quantity,
                stackable: true,
                emote: ore
            }
        }
        ballance.wallet += coins;
        db.set(`${user.id}`, ballance);
        inventory.set(`${user.id}`, bag);

        message.reply({embeds: [embed]});
        return setCooldown(60000 * 10, topic);
    }
}