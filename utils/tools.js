const { Database } = require('jesscode-lib');
const parseTime = require('parse-ms-2');
const db = new Database('cooldown');
let cooldown;

async function set(cmd, cd){
    if(!db.has(cmd)){
        db.set(cmd, (Date.now() + (cd * 1000)));
    } else {
        return;
    }
}
async function has(cmd){
    if(db.has(cmd)){
        if(await db.get(cmd) < Date.now()){
            db.remove(cmd);
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}
async function get(cmd){
    if(db.has(cmd)){
        let times = parseTime(await db.get(cmd) - Date.now());
        return times.seconds;
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