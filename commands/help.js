const config = require("../config");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "help",
    description: "Afficher la page d'aide du bot.",
  },

  async exe(client, interaction) {   
     const helpEmbed = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
      .setDescription(`[Bienvenue sur DeltaBot](https://deltabot.fr/)\n\nMerci d'utiliser notre bot !\n\nTest`)
      .setImage(config.imageBot)
      .setColor(config.color.default);

    await interaction.reply({
      embeds: [helpEmbed],
    });
  },
};