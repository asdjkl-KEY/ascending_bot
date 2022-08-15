const { _ET } = require('../utils/tools');
const { botProperties } = require('../utils/database');
//const { Database } = require('jesscode-lib');
//const db = new Database('<name>');
const { ToolKit } = require('jesscode-lib');
const tk = new ToolKit();

module.exports = {
    name: 'tools',
    alias: ['utils', 'tls'],
    category: 'private',
    description: 'Este comando puede usar una o varias herramientas programadas por el desarrollador',
    usage: '[tools | tls | utils] <tool>',
    async execute(client, message, args){
        if(!args[0]) {
            let embed = new _ET({
                color: '#fc0303',
                title: 'CUÁL DE TODAS?',
                description: `
                    Especifica una herramienta para usar.
                    Estas son las herramientas disponibles:
                    \`\`\`
                    - Token
                    - Uuid
                    - Database
                    - Matriz
                    - Merge
                    \`\`\`                
                `,
                message
            });
            return embed.send();
        }
        switch(args[0]){
            case 'token':
                let embed = new _ET({
                    color: 'random',
                    title: 'TOKEN',
                    description: `
                    Aquí tiene un Token Generado con el TOKEN_ENGINE_V7 de SparklyBot: **${tk.token()}**
                    `,
                    message
                })
                if(args[1] === 'private'){
                    embed.send('private');
                } else {
                    embed.send();
                }
                break;
            case 'uuid':
                let uuid = tk.uuid();
                let embed2 = new _ET({
                    color: 'random',
                    title: 'UUID',
                    description: `
                    Aquí tiene un UUID Generado con el UUID_ENGINE de SparklyBot: **${uuid}**
                    `,
                    message
                });
                if(args[1] === 'private'){
                    embed2.send('private');
                } else {
                    embed2.send();
                }
                break;
        }
    }
}