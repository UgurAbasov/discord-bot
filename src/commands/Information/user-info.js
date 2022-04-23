const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js")
const moment = require('moment');
moment.locale(`ru`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName("user-info")
		.setDescription("Информация о пользователе")
        .addUserOption((option) => 
            option
            .setName('user')
            .setDescription('The user')
        ),
	async execute(interaction) {

		const Target = interaction.member
        const Member = interaction.guild.members.cache.get(Target.id)
        const target = interaction.options.getUser('user')
        console.log("target")
        
        if(target) {
            const member = interaction.guild.members.cache.get(`${target.id}`)
            const userinfoEmbed = new MessageEmbed()
            .setAuthor(`${target.username}` , target.displayAvatarURL({dynamic: true}))
            .setThumbnail(target.displayAvatarURL({dynamic: true}))
            .setColor(`#2f3136`)
            .addField("Айди пользоателя", `\`${target.id}\``, true)
            .addField("Высшая роль", `${member.roles.highest}`, true)
            .addField("Количество ролей" , `\`${member.roles.cache.size}\``, true)
            .addField("Участник сервера с" , `• \`${moment(member.joinedAt).format('L')} - ${moment(target.joinedAt).startOf('day').fromNow()}\``, true)
            .addField("Пользователь Discord с" , `• \`${moment(target.createdAt).format('L ')} - ${moment(target.createdAt).startOf('day').fromNow()}\`` , true)
            interaction.reply({embeds: [userinfoEmbed]})
        } else {
        const myselfinfoEmbed = new MessageEmbed()
        .setAuthor(`${Target.user.username}` , Target.displayAvatarURL({dynamic: true}))
        .setThumbnail(Target.displayAvatarURL({dynamic: true}))
        .setColor(`#2f3136`)
        .addField("Айди пользоателя", `\`${Target.id}\``, true)
        .addField("Высшая роль", `${Member.roles.highest}`, true)
        .addField("Количество ролей" , `\`${Member.roles.cache.size}\``, true)
        .addField("Участник сервера с" , `• \`${moment(Member.joinedAt).format('L')} - ${moment(Member.joinedAt).startOf('day').fromNow()}\`\`\``, true)
        .addField("Пользователь Discord с" , `• \`${moment(Target.user.createdAt).format('L ')} - ${moment(Target.user.createdAt).startOf('day').fromNow()}\`` , true)
		interaction.reply({
			embeds: [myselfinfoEmbed],
        })};
	},
};