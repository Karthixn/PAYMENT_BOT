const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  async execute(client, member) {
    const welcomeChannel = member.guild.channels.cache.get(client.welcomeChannelId);
    const role = member.guild.roles.cache.get(client.autoRoleId);

    // Auto-role
    if (role) {
      try {
        await member.roles.add(role);
      } catch (err) {
        console.error("Auto-role error:", err);
      }
    }

    // Welcome Message in Public Channel
    if (welcomeChannel) {
      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(`🎉 Welcome to ${member.guild.name}!`)
        .setDescription(`Hey ${member}, welcome aboard!\n\nUse \`!products\` or check <#${client.welcomeChannelId}> for OTT/Game services.`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: "Thanks for joining us!" })
        .setTimestamp();

      welcomeChannel.send({ embeds: [embed] });
    }

    // Optional DM
    try {
      await member.send({
        content: `👋 Welcome to **${member.guild.name}**!\n\nYou can browse OTT/Game options in the server or open a ticket to place an order.\nNeed help? Just ping staff or type \`!help\`.`
      });
    } catch (err) {
      console.warn("Couldn't DM user.");
    }
  }
};
