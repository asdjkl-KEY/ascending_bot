const { Database } = require('jesscode-lib');
const parseTime = require('parse-ms-2');
const db = new Database('cooldown');
let cooldown;

async function set(user, cmd, cd){
    let cool = await db.get(user.id);
    if(cool){
        cool[cmd] = Date.now() + cd * 1000;
        db.set(user.id, cool);
    } else {
        cool = {};
        cool[cmd] = Date.now() + cd * 1000;
        db.set(user.id, cool);
    }
}
async function has(user, cmd){
    let cool = await db.get(user.id);
    if(cool){
        if(cool[cmd]){
            if(Date.now() < cool[cmd]){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
async function get(cmd){
    // if(db.has(cmd)){
        let times = parseTime(await db.get(cmd) - Date.now());
        
    // } else {
    //     return false;
    // }
    let cool = await db.get(user.id);
    if(cool){
        if(cool[cmd]){
            if(Date.now() < cool[cmd]){
                let times = parseTime(cool[cmd] - Date.now());
                let hours = times.hours;
                let minutes = times.minutes;
                let seconds = times.seconds;
                let time = `${hours}${hours > 0 ? ' horas, ' : ''}${minutes}${minutes > 0 ? ' minutos y': ''}${seconds} segundos`;
                return time;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

cooldown = {
    set,
    has,
    get
}
module.exports = { cooldown };