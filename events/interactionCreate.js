const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    if (!interaction.isButton()) return;

    if (interaction.customId === "confirm_payment") {
      await interaction.deferUpdate();

      const user = interaction.user;
      const channel = interaction.channel;
      const logChannel = interaction.guild.channels.cache.get(process.env.PAYMENT_LOG_CHANNEL_ID);

      const confirmEmbed = new EmbedBuilder()
        .setColor(Colors.Blue)
        .setTitle("✅ Payment Confirmed")
        .setDescription(`**User:** ${user}\n**Channel:** ${channel}\n\nThey clicked Confirm on a payment.`)
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp();

      if (logChannel) {
        logChannel.send({ embeds: [confirmEmbed] });
      }

      try {
        await user.send("✅ Payment confirmation received! Staff will check and deliver shortly.");
      } catch {
        // ignore DM errors
      }
    }
  }
};
