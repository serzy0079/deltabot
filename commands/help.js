const config = require("../config");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "help",
    description: "Afficher la page d'aide du bot.",
  },

  async exe(client, interaction) {   
     const helpEmbed = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username} | Commandes`, iconURL: `${client.user.displayAvatarURL()}` })
      .setDescription(`• Je suis un bot multifonction **Français** crée par \`serzy0079\`. Vous pouvez trouver mon code sur la plateforme [github](https://github.com/serzy0079/deltabot).\n\n\`🧰 Administration - (1)\`\n\`/antilink\`\n\n\`👥 Général - (1)\`\n\`/botinfo\``)
      .setImage(config.imageBot)
      .setColor(config.color.default);

    await interaction.reply({
      embeds: [helpEmbed],
    });
  },
};