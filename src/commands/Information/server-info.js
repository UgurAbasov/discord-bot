const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { emojis } = require('../Information/ping');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('server-info')
    .setDescription('Информация о сервере'),

    async execute(interaction) {

 
 const embed = new MessageEmbed()
 .setAuthor(interaction.guild.name, interaction.guild.iconURL())
 .setColor("PURPLE")
 .setFooter(`Serverinfo of ${interaction.guild.name}`, interaction.guild.iconURL())
 .setThumbnail(interaction.guild.iconURL())
 .addFields(
 {
 name: "🌍 | General",
 value: 
 `
 - **Название сервера**: ${interaction.guild.name}
 - **Владелец**: <@${interaction.guild.ownerId}>
 - **Дата создания**: <t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>

 `
 },
 {
 name: "👥 | Участники",
 value: 
 `
 - **Количество участников**: ${interaction.guild.members.cache.filter((m) => !m.user.bot).size}
 - **Количество ботов**: ${interaction.guild.members.cache.filter((m) => m.user.bot).size}
 
 - **Общее количество**: ${interaction.guild.memberCount}
 `
 },
 {
 name: "📜 | Каналы",
 value:
 `
 - **Текстовые**: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
 - **Голосовые**: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
 - **Категории**: ${interaction.guild.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}

 - **Общее количество**: ${interaction.guild.channels.cache.size}
 `
 },
 {
 name: "🥳 | Бусты",
 value: 
 `
 - **Количество бустов сервера**: ${interaction.guild.premiumSubscriptionCount}
 - **Количество бустеров**: ${interaction.guild.members.cache.filter((m) => m.premiumSince).size}
 `
 }
 )
 interaction.reply({ embeds: [embed] })
 }
 
}