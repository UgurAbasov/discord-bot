const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const interactionCreate = require('./events/interactionCreate');

const generateImage = require("./../generateImage")

const client = new Client({ 
  intents: [ Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS" ]
});

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions")
  .filter(file => file.endsWith(".js"));

const eventFiles = fs.readdirSync("./src/events")
  .filter(file => file.endsWith(".js"));

const commandFolders = fs.readdirSync("./src/commands");

for (file of functions) {
  require(`./functions/${file}`)(client);

}

const welcomeChannelId = "967436818847002705"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Добро пожаловать на сервер`,
        files: [img]
    })
})

client.handleEvents(eventFiles, "./src/events");
client.handleCommands(commandFolders, "./src/commands");

client.login(process.env.token);
