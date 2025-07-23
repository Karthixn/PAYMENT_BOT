module.exports = {
  name: "say",
  description: "Make the bot say something!",
  execute(client, message, args) {
    if (!message.member.permissions.has("ManageMessages")) return message.reply("You don't have permission!");
    const msg = args.join(" ");
    if (!msg) return message.reply("Please provide a message.");
    message.delete().catch(() => {});
    message.channel.send(msg);
  }
};
