const { SlashCommandBuilder} = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ugur")
        .setDescription("about"),
    async execute(interaction, config) {    
        if(interaction.member.roles.cache.has('960571802730508391')){
            interaction.reply("gi bro")


        } else {
            interaction.reply("you dont have permissions")
        }
    }    
}