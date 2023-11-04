const { EmbedBuilder, version: discordVersion } = require("discord.js");
const config = require("../config");

module.exports = {
  data: {
    name: "botinfo",
    description: "Afficher les informations concernant le bot.",
  },

  async exe(client, interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Informations sur le bot")
      .setDescription(`Nom du bot : **${client.user.username}**\nID du bot : \`${client.user.id}\`\nCréateur : \`serzy0076\`\nServeurs : \`${client.guilds.cache.size}\`\nUtilisateurs : \`${client.users.cache.size}\`\nChannel : \`${client.channels.cache.size}\`\nCréé le : \`${client.user.createdAt.toDateString()}\`\nGithub : [Clique](https://github.com/serzy0079/deltabot)`)
      .setImage(config.imageBot)
      .setColor(config.color.default);

    interaction.reply({ embeds: [embed] });
  },
};