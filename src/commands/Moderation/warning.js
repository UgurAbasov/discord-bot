const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("../../Models/WarningDB");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Система предупреждения')
    .addSubcommand(subcommand =>
		subcommand
			.setName('add')
			.setDescription('Добавить предупреждение участнику')
            .addUserOption(option =>
                option.setName('target')
                    .setDescription('Выберите участника')
                    .setRequired(true))
                    .addStringOption(option =>
                        option.setName('reason')
                            .setDescription('Укажите причину выдачи предупреждения')
                            .setRequired(true))
                            .addStringOption(option =>
                                option.setName('evidence')
                                    .setDescription('Выберите свидетеля')
                                    .setRequired(false)))
	.addSubcommand(subcommand =>
		subcommand
        .setName('check')
			.setDescription('Посмотреть список предупреждений участника')
            .addUserOption(option =>
                option.setName('target')
                    .setDescription('Выберите участника')
                    .setRequired(true)))
            .addSubcommand(subcommand =>
                subcommand
                    .setName('remove')
                    .setDescription('Снять предупреждение участника')
                    .addUserOption(option =>
                        option.setName('target')
                            .setDescription('Выберите участника')
                            .setRequired(true))
                            .addNumberOption(option =>
                                option.setName('warnid')
                                    .setDescription('Укажите id предупреждения')
                                    .setRequired(false)))
            .addSubcommand(subcommand =>
                subcommand
                    .setName('clear')
                    .setDescription('Снять все предупреждения участника')
                    .addUserOption(option =>
                        option.setName('target')
                            .setDescription('Выберите участника')
                            .setRequired(true))),

                            async execute(interaction, arguments) {
                                const Sub = interaction.options.getSubcommand(["add", "check", "remove", "clear"]);
                                const Target = interaction.options.getMember("target");
                                const Reason = interaction.options.getString("reason");
                                const Evidence = interaction.options.getString("evidence") || "Свидетели не найдены";
                                const WarnID = interaction.options.getNumber("warnid");
                                const WarnDate = new Date(interaction.createdTimestamp).toLocaleDateString();


                                const Bratan = new MessageEmbed()
                                .setColor("RED")

                                
                                if(!interaction.member.roles.cache.has('876936421557035039, 879098632010338376, 876932711695134770')) {
                                    Bratan.setDescription("У тебя нет прав")
                                    interaction.reply({embeds: [Bratan], ephemeral: true});
                                    return;
                                } if(interaction.member.roles.highest.position <= member.roles.highest.position) {
                                    Bratan.setDescription("Вы не можете выдать мут роли которая выше вашей роли")
                                    interaction.reply({embeds: [Bratan], ephemeral: true});
                                    return;
                                }

                            if(Sub === 'add') {

                            db.findOne({ GuildID: interaction.guildId, UserID: Target.id, UserTag: Target.user.tag }, async (err, data) => {
                                if(err) throw err;
                                if(!data) {
                                    data = new db({
                                        GuildID: interaction.guildId,
                                        UserID: Target.id,
                                        UserTag: Target.user.tag,
                                        Content: [
                                            {
                                                ExecuterID: interaction.user.id,
                                                ExecuterTag: interaction.user.tag,
                                                Reason: Reason,
                                                Evidence: Evidence,
                                                Date: WarnDate
                                            }
                                        ]
                                    })
                                } else {
                                    const obj = {
                                        ExecuterID: interaction.user.id,
                                        ExecuterTag: interaction.user.tag,
                                        Reason: Reason,
                                        Evidence: Evidence,
                                        Date: WarnDate
                                    }
                                    data.Content.push(obj)
                                }
                                data.save()
                            });


                            interaction.reply({embeds: [new MessageEmbed()
                            .setTitle("Система предупреждения")
                            .setColor("BLURPLE")
                            .setDescription(`Предупреждение выдано: ${Target.user.id} | ||${Target.id}||\n**Причина**: ${Reason}\n**Свидетель**: ${Evidence}`)
                            ]})

                            } else if(Sub === 'check') {

                            db.findOne({ GuildID: interaction.guildId, UserID: Target.id, UserTag: Target.user.tag }, async (err, data) => {
                                if(err) throw err;
                                if(data) {
                                    interaction.reply({embeds: [new MessageEmbed()
                                        .setTitle("Список предупреждений")
                                        .setColor("BLURPLE")
                                        .setDescription(`${data.Content.map(
                                            (w, i) => `**Предупреждения**: ${i + 1}\n**Выдано**: ${w.ExecuterTag}\n**Время выдачи**: ${w.Date}\n**Причина**: ${Reason}\n**Свидетель**: ${Evidence}
                                            \n`
                                        ).join(" ")}`)
                                        ]})
                                } else {
                                     
                                        interaction.reply({embeds: [new MessageEmbed()
                                        .setTitle("Список предупреждений")
                                        .setColor("BLURPLE")
                                        .setDescription(`${Target.user.tag} | ||${Target.id}|| не имеет предупреждений`)
                                        ]})
                                }
                            })



                            } else if(Sub === 'remove') {

                            db.findOne({ GuildID: interaction.guildId, UserID: Target.id, UserTag: Target.user.tag }, async (err, data) => {
                                if(err) throw err;
                                if(data) {
                                    data.Content.splice(WarnID, 1)
                                    interaction.reply({embeds: [new MessageEmbed()
                                        .setTitle("Снятие предупреждения")
                                        .setColor("BLURPLE")
                                        .setDescription(`${Target.user.tag} id предупреждения ${WarnID + 1} был снят`)
                                     ]})
                                     data.save()
                                } else {
                                    interaction.reply({embeds: [new MessageEmbed()
                                        .setTitle("Снятие предупреждения")
                                        .setColor("BLURPLE")
                                        .setDescription(`${Target.user.tag} | ||${Target.id}|| не имеет предупреждений`)
                                        ]})
                                }
                             })
                        
                            } else if(Sub === 'clear') {
                                db.findOne({ GuildID: interaction.guildId, UserID: Target.id, UserTag: Target.user.tag }, async (err, data) => {
                                    if(err) throw err;
                                    if(data) {
                                        await db.findOneAndDelete({ GuildID: interaction.guildId, UserID: Target.id, UserTag: Target.user.tag })
                                        interaction.reply({embeds: [new MessageEmbed()
                                            .setTitle("Снятие всех предупреждений")
                                            .setColor("BLURPLE")
                                            .setDescription(`${Target.user.tag} предупреждения были сняты | ||${Target.id}||`)
                                         ]})
                                    } else { 
                                        interaction.reply({embeds: [new MessageEmbed()
                                            .setTitle("Снятие всех предупреждений")
                                            .setColor("BLURPLE")
                                            .setDescription(`${Target.user.tag} | ||${Target.id}|| не имеет предупреждений`)
                                            ]})
                                    }
                            })
                            
                            
                            
                            } 
                            
                            
            }
}