const bedrock = require('bedrock-protocol')
process.env.DEBUG = 'minecraft-protocol'
const { EventEmitter } = require('stream');
const uuid = require('uuid');
const config = require('./config.json');
var id = 0
const chat = new EventEmitter();
var client

if (config.realm) {
    client = bedrock.createClient({
        host: 'localhost',
        skipPing: true,
        port: 19132,
        username: config.name,
        offline: false,
        realms: {
            realmInvite: config.invite
        },
        connectTimeout: 100000
    })
}


const sendCommand = async (command, timeout = 15000) => {
    return new Promise((resolve, reject) => {
        const requestId = uuid.v4()
        client.queue('command_request', {
            command,
            origin: {
                type: 'player',
                uuid: requestId,
                request_id: requestId,
            },
        })
    })
}


chat.on('command', (sender, tag, msg) => {
    sendCommand(msg)
})
chat.on('discord', (sender, tag, msg) => {
    sendCommand(`tellraw @a {"rawtext":[{"text":"§8[§9Discord§8] §7${sender}#${tag}: §f${msg}"}]}`)
})



client.on('text', (packet) => { // Listen for chat messages
    if (packet.source_name) {
        console.log(packet)
        chat.emit('inGame', packet.source_name, packet.message)
    }

})
module.exports = chat;