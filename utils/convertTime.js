const { default: parseMilliseconds } = require('parse-ms');

async function convertTime(time){
    time = time - Date.now();
    let times = parseMilliseconds(time);
    if(times.days > 0) return times.days+'d';
    if(times.hours > 0) return times.hours+'h';
    if(times.minutes > 0) return times.minutes+'min';
    if(times.seconds > 0) return times.seconds+'s'
}

module.exports = convertTime;