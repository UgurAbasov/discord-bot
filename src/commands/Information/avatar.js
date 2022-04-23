const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js")
module.exports = {
	data: new SlashCommandBuilder()
		.setName("avatar")
		.setDescription("Выводит аватарку")
        .addUserOption((option) => 
            option
            .setName('user')
            .setDescription('The user')
        ),
	async execute(interaction) {	
        const user = interaction.options.getUser('user');

        if (user) {
            let useravataremb = new MessageEmbed()
            .setDescription(`Аватарка ${user}`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 256}))
            .setColor("#2f3136")
            .setFooter({ text: `Команда от ${user}`});
            interaction.reply({embeds: [useravataremb]})
        } else {
            let yourselfavataremb = new MessageEmbed()
            .setDescription(`Аватарка ${interaction.member}`)
            .setImage(interaction.member.displayAvatarURL({ dynamic: true, size: 256}))
            .setColor("#2f3136")
            .setFooter({ text: `Команда от ${user}`});
            interaction.reply({embeds: [yourselfavataremb]})
        };
	},
};