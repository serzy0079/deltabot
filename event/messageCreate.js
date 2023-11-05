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
      
      const channelNull = guildData?.plugins.antilink?.ignoredChannel;
      const roleNull = guildData?.plugins.antilink?.ignoredRole;

      const hasIgnoredRole = message.member.roles.cache.some((role) => ignoredRoles.includes(role.id));

      const isIgnoredChannel = ignoredChannels.includes(message.channel.id);
      
      const linkRegex = /(?:discord\.gg|discordapp\.com\/invite)\//;
      if (linkRegex.test(message.content) && !hasIgnoredRole && !isIgnoredChannel) {
        
        const embed = new EmbedBuilder()
          .setTitle("🔒 Système d'antilink")
    .setDescription(
      `${config.emoji.warning} **Whoops!** Vous n'avez pas la permission d'envoyer des liens sur ce serveur.\n\nOh! **Soyez immunisé par le système** si vous essayez d'envoyer des liens dans le salon configuré (${
        channelNull ? `<#${channelNull}>` : "Aucun salon configuré"
      }) ou si vous avez le rôle configuré (${
        roleNull ? `<@&${roleNull}>` : "Aucun rôle configuré"
      }) 😉`
    )
          .setImage(config.imageBot)
          .setColor(config.color.default);

        message.reply({ embeds: [embed] });
        
        message.delete();
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