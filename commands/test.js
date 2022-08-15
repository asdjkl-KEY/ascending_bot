

module.exports = {
    name: 'test',
    alias: ['test'],
    category: 'private',
    description: 'Test command',
    usage: 'test',
    execute(client, message, args){
        message.channel.send('Test command executed');
    }
}