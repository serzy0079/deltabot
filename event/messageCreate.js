const config = require("../config");
const Guild = require("../models/Guild");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: 'messageCreate',
  async execute(client, message) {
    if (!message.guild) {
      return;
    }

    const guildId = message.guild.id;

    const guildData = await Guild.findOne({ id: guildId });

    if (guildData && guildData.plugins.antilink.enabled) {
      const ignoredChannels = guildData.plugins.antilink.ignoredChannels || [];
      const ignoredRoles = guildData.plugins.antilink.ignoredRoles || [];

      const hasIgnoredRole = message.member.roles.cache.some((role) => ignoredRoles.includes(role.id));

      const isIgnoredChannel = ignoredChannels.includes(message.channel.id);

      const linkRegex = /(?:discord\.gg|discordapp\.com\/invite)\//;
      if (linkRegex.test(message.content) && !hasIgnoredRole && !isIgnoredChannel) {
        message.delete();

        const embed = new EmbedBuilder()
          .setTitle("Lien d'invitation non autorisé")
          .setDescription("Les liens d'invitation ne sont pas autorisés ici.")
          .setFooter("Message automatiquement supprimé.")
          .setImage(config.imageBot)
          .setColor(config.color.default);

        message.reply({ embeds: [embed] });
      }
    }

    if (message.mentions.has(client.user)) {
      const embed = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`Hey error, je suis un bot multifonction **Français** crée par \`serzy0079\` avec la librairie [discord.js](https://discord.js.org/) et j'utilise comme base de donnée [mongoose](https://mongoosejs.com/).\nViens découvir mon code sur l'espace [github](https://github.com/serzy0079/deltabot) dédier a **DeltaBot** 🔔`)
        .setImage(config.imageBot)
        .setColor(config.color.default);

      message.reply({ embeds: [embed] });
    }
  }
};