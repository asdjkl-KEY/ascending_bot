const { _ET } = require('../utils/tools');
const { botProperties } = require('../utils/database');
//const { Database } = require('jesscode-lib');
//const db = new Database('<name>');
const { ToolKit } = require('jesscode-lib');
const tk = new ToolKit();



module.exports = {
    name: 'tools',
    alias: ['tools', 'tls', 'utils'],
    category: 'private',
    description: 'Este comando puede usar una o varias herramientas programadas por el desarrollador',
    usage: '[tools | tls | utils] <tool>',

    /*
        * @param {client} client: El cliente de discord del bot
        * @param {message} message: El mensaje de discord del bot
        * @param {args} args: Los argumentos del comando
    */
    async execute(client, message, args){
        if(!args[0]) {
            let embed = new _ET({
                color: '#fc0303',
                title: 'CUÁL DE TODAS?',
                description: `
                    Especifica una herramienta para usar.
                    Estas son las herramientas disponibles:
                    \`\`\`- Token\n- Uuid\n- Database\n- Matriz\n- Merge
                    \`\`\`                
                `,
                message
            });
            return embed.send();
        }
        switch(args[0]){
            case 'token':
                let token = tk.token(args[1] ? parseInt(isNaN(args[1]) ? '64' : args[1]) : 64);
                let embed = new _ET({
                    color: 'random',
                    title: 'TOKEN',
                    description: `
                    Aquí tiene un Token Generado con el TOKEN_ENGINE_V7 de SparklyBot: **${token}**
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
            case 'matriz':
                let rows;
                let columns;
                if(args[1] && !isNaN(parseInt(args[1]))){
                    rows = parseInt(args[1]);
                }
                if(!args[2] && !isNaN(parseInt(args[2]))){
                    columns = parseInt(args[2]);
                }
                let matriz = tk.matriz(rows, columns);
        }
    }
}