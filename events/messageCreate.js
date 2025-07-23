module.exports = {
  name: "messageCreate",
  execute(client, message) {
    if (message.author.bot || !message.guild) return;

    const prefix = client.prefix;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);
    if (!command) return;

    try {
      command.execute(client, message, args);
    } catch (err) {
      console.error(err);
      message.reply("Something went wrong executing this command.");
    }
  }
};
