require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();
client.prefix = process.env.PREFIX;
client.welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
client.modLogChannelId = process.env.MODLOG_CHANNEL_ID;
client.autoRoleId = process.env.AUTO_ROLE_ID;

// Load commands
fs.readdirSync("./commands").forEach(file => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

// Load events
fs.readdirSync("./events").forEach(file => {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(client, ...args));
});

client.login(process.env.DISCORD_TOKEN);
