//R son los recursos enviados desde el handler.
const { PermissionsBitField } = require('discord.js');
let p = PermissionsBitField.Flags;

module.exports = {
    name: 'work',
    alias: ['trabajar', 'w'],
    permissions: [],
    category: 'currency',
    description: 'Con este comando puedes trabajar y ganar dinero.',
    usage: '<prefix> work',
    async execute(client, message, args, R){
        let e = R.emojis;
        let db = R.Databases.ranks;
        let cooldown = R.cooldown;
        let user = message.author;
        if(await cooldown.has(user, 'work')) return message.reply(`Debes esperar **${await cooldown.get(user, 'work')}** para usar este comando.`);
        let guild = await db.get(message.guild.id);
        let info = guild[user.id];
        let salaries = {
            doctor: [500, 1500],
            minero: [500, 2000],
            bombero: [500, 2000],
            policia: [500, 1500],
            constructor: [500, 2500],
            ladron: [500, 1500]
        }
        if(!info.work){
            info.work = {
                current: 'none',
                totalWorks: 0,
                salary: [0, 0]
            };
        }
        if(info.work.current === 'none'){
            //user select work
            let embed = new R.embed()
            .setTitle('Aún no tienes trabajo!')
            .setDescription(`Selecciona un trabajo\nReacciona para recibir tu trabajo:
            ${e.doctor}: Doctor \`(30%+ en los comandos de juegos)\`
            ${e.pica}: Minero \`(+20 de probabilidad de aumento de salario)\`
            ${e.policia}: Policia \`(Puede atrapar a los usuarios que hayan robado en los últimos 30 segundos)\`
            ${e.constructor}: Constructor \`(Posibilidad de ganar dinero extra en cada trabajo)\`
            ${e.bombero}: Bombero \`(30% menos de cooldown)\`
            ${e.ladron}: Ladrón \`(Nunca falla los robos + -30% cooldown en el comando rob)\`
            `)
            .setColor('#fcfc00')
            .setFooter({text: 'Selecciona un trabajo en 3 minutos.'})
            let msg = await message.reply({embeds: [embed]});
            await msg.react(e.doctor);
            await msg.react(e.pica);
            await msg.react(e.policia);
            await msg.react(e.constructor);
            await msg.react(e.bombero);
            await msg.react(e.ladron);
            let filter = (reaction, user) => user.id === message.author.id;
            let collector = msg.createReactionCollector({filter, time: 180000});
            collector.on('collect', async (reaction, user) => {
                if(reaction.emoji.name === e.doctor){
                    info.work.current = 'doctor';
                    info.work.totalWorks = 0;
                    info.work.salary = salaries.doctor;
                    await msg.delete();
                    await message.reply('Has seleccionado doctor '+ e.doctor);
                } else if(reaction.emoji.id === e.pica.split(':')[2].replace('>', '')){
                    info.work.current = 'pica';
                    info.work.totalWorks = 0;
                    info.work.salary = salaries.minero;
                    await msg.delete();
                    await message.reply('Has seleccionado minero '+ e.pica);
                } else if(reaction.emoji.name === e.policia){
                    info.work.current = 'policia';
                    info.work.totalWorks = 0;
                    info.work.salary = salaries.policia;
                    await msg.delete();
                    await message.reply('Has seleccionado policia ' + e.policia);
                } else if(reaction.emoji.name === e.constructor){
                    info.work.current = 'constructor';
                    info.work.totalWorks = 0;
                    info.work.salary = salaries.constructor;
                    await msg.delete();
                    await message.reply('Has seleccionado constructor ' + e.constructor);
                } else if(reaction.emoji.name === e.bombero){
                    info.work.current = 'bombero';
                    info.work.totalWorks = 0;
                    info.work.salary = salaries.bombero;
                    await msg.delete();
                    await message.reply('Has seleccionado bombero ' + e.bombero);
                } else if(reaction.emoji.id === e.ladron.split(':')[2].replace('>', '')){
                    info.work.current = 'ladron';
                    info.work.totalWorks = 0;
                    info.work.salary = salaries.ladron;
                    await msg.delete();
                    await message.reply('Has seleccionado ladrón ' + e.ladron);
                }
            })
        }
        let quantity = Math.floor(Math.random() * (info.work.salary[1] - 500)) + info.work.salary[0];
        let trabajos = {
            minero: [
                `Has trabajado como un negro en la mina y has ganado **${quantity}**${e.coin}`,
                `Hoy ha sido un buen día hubo bastante mineral y has ganado **${quantity}**${e.coin}`,
                `Eres un buen minero y has ganado **${quantity}**${e.coin}`,
                `Has trabajado como todo un profesional y has ganado **${quantity}**${e.coin}`,
                `Tus esfuerzos dan sus frutos y has ganado **${quantity}**${e.coin}`,
                `Eres uno de los pocos que sabe trabajar en la mina por eso hoy ganas **${quantity}**${e.coin}`,
                `Te consideran el prota de la mina y te han pagado **${quantity}**${e.coin}`
            ],
            doctor: [
                `Hoy has tenido que atender a un paciente con coronavirus y has ganado **${quantity}**${e.coin}`,
                `Hoy has tenido que atender a un paciente con covid y has ganado **${quantity}**${e.coin}`,
                `Hoy has tenido que atender a un paciente con covid-19 y has ganado **${quantity}**${e.coin}`,
                `Hoy hiciste una cirugía muy compleja y has ganado **${quantity}**${e.coin}`,
                `Han dejado el trabajo en tus manos y te han pagado **${quantity}**${e.coin} pra que lo termines`,
                `Tu esfuerzos han sido recompensados y has ganado **${quantity}**${e.coin}`,
                `Empiezas a ganar reputación, hoy te pagaron **${quantity}**${e.coin}`
            ],
            bombero: [
                `Hoy has tenido que apagar un incendio y has ganado **${quantity}**${e.coin}`,
                `Hoy has tenido que apagar un incendio en una casa y has ganado **${quantity}**${e.coin}`,
                `Hoy has tenido que apagar un incendio en un edificio y has ganado **${quantity}**${e.coin}`,
                `Hoy has tenido que apagar un incendio en un edificio de oficinas y has ganado **${quantity}**${e.coin}`,
                `Hoy has tenido que apagar un incendio en un edificio de apartamentos y has ganado **${quantity}**${e.coin}`,
                `Has ayudado a apagar un incendio forestal y has ganado **${quantity}**${e.coin}`,
                `Has salvado a una familia de un incendio y has ganado **${quantity}**${e.coin}`,
                `Tus esfuerzos han sido recompensados y has ganado **${quantity}**${e.coin}`,
                `Empiezas a ganar reputación, hoy te pagaron **${quantity}**${e.coin}`
            ],
            policia: [
                `Hoy has tenido que detener a un ladrón y has ganado **${quantity}**${e.coin}`,
                `Te han encomendado el arresto de un criminal y te pagaron **${quantity}**${e.coin}`,
                `Has pillado a un ladrón en un banco y has ganado **${quantity}**${e.coin}`,
                `Pillaste al que roba en el supermercado y has ganado **${quantity}**${e.coin}`,
                `Atrapaste al que roba las tortillas y has ganado **${quantity}**${e.coin}`,
                `El pibe que robaba verduras te ha pagado **${quantity}**${e.coin} porque resultó ser millonario`,
                `Sos un crack, has atrapado a un asesino y te han pagado **${quantity}**${e.coin}`,
                `El mejor detective!! Has atrapado a un asesino y te han pagado **${quantity}**${e.coin}`,
                `Has resuelto un caso imposible y te han pagado **${quantity}**${e.coin}`
            ],
            constructor: [
                `Hoy has tenido que construir una casa y has ganado **${quantity}**${e.coin}`,
                `Hoy fuiste a trabajar al edificio en construcción y has ganado **${quantity}**${e.coin}`,
                `El trabajo es un poco duro pero has ganado **${quantity}**${e.coin}`,
                `Nunca dijeron que el trabajo fuera fácil pero has ganado **${quantity}**${e.coin}`,
                `Nadie como tú! Has ganado **${quantity}**${e.coin}`,
                `Eres duro de roer, has ganado **${quantity}**${e.coin}`,
                `El trabajo no te vence, nunca antes se había visto tal hazaña! has ganado **${quantity}**${e.coin}`,
                `Tus esfuerzos han sido recompensados y has ganado **${quantity}**${e.coin}`,
                `Empiezas a ganar reputación, hoy te pagaron **${quantity}**${e.coin}`
            ],
            ladron: [
                `Hoy has robado un banco y has ganado **${quantity}**${e.coin}`,
                `Hoy no había casi guardias, los has dejado dormidos y has robado **${quantity}**${e.coin}`,
                `Robaste a una anciana en la calle y su cartera tenía **${quantity}**${e.coin}`,
                `Robaste a un empresario y has ganado **${quantity}**${e.coin}`,
                `El jefe de la mafia te ha pagado **${quantity}**${e.coin} por un trabajo bien hecho`,
                `Has robado a un millonario y has ganado **${quantity}**${e.coin}`,
                `Ladrón que roba a ladrón tiene 100 años de perdón, has robado a otro ladrón**${quantity}**${e.coin}`
            ]
        }
        let job = trabajos[info.work.current][Math.floor(Math.random() * trabajos[info.work.current].length)];
        let embed = new R.embed()
            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setDescription(job)
            .setColor("#00fc00")
            if(info.work.current === 'constructor'){
                let probability = Math.floor(Math.random() * 100);
                let aumento = Math.floor(Math.random() * 500) + 500;
                let proAumento = Math.floor(Math.random() * 100);
                if(probability >= 60){
                    let extra = 500;
                    embed.setFields({ name: '¡Has ganado un premio extra!', value: `**${extra}**${e.coin}` })
                }
                if(proAumento > 90){
                    embed.setFields({ name: '¡Has ganado un aumento de sueldo!', value: `**${aumento}**${e.coin}` })
                }
                info.work.salary[1] += aumento;
                info.ballance.wallet += aumento;
                info.ballance.wallet += extra;
                info.ballance.wallet += quantity;
            } else if(info.work.current === 'minero'){
                let aumento = Math.floor(Math.random() * 500) + 500;
                let probability = Math.floor(Math.random() * 100);
                if(probability >= 70){
                    embed.setFields({ name: '¡Has ganado un aumento de sueldo!', value: `**${aumento}**${e.coin}` })
                }
                info.ballace.wallet += quantity;
                info.ballance.wallet += aumento;
            } else {
                info.ballance.wallet += quantity;
                let probability = Math.floor(Math.random() * 100);
                let extra = Math.floor(Math.random() * 500) + 500;
                if(probability >= 90){
                    embed.setFields({ name: '¡Has ganado un aumento de salario!', value: `**${extra}**${e.coin}` })
                }
                info.ballance.wallet += extra;
            }
            guild[message.author.id] = info;
            await db.set(message.guild.id, guild);
            message.reply({ embeds: [embed] })
            await cooldown.set(message.author, 'work', info.work.current === 'bombero' ? (18 * 60) : 3600);
    }
}