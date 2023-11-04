const config = require("../config");
const Guild = require("../models/Guild");

module.exports = {
  name: 'messageCreate',
  async execute(client, message) {
    if (!message.guild) {
      return;
    }

    const guildId = message.guild.id;

    const guildData = await Guild.findOne({ id: guildId });

    if (guildData && guildData.plugins.antilink.enabled) {
      const ignoredChannels = guildData.plugins.antilink.ignoredChannel || [];
      const ignoredRoles = guildData.plugins.antilink.ignoredRole || [];

      const hasIgnoredRole = message.member.roles.cache.some((role) => ignoredRoles.includes(role.id));

      const isIgnoredChannel = ignoredChannels.includes(message.channel.id);

      const linkRegex = /(?:discord\.gg|discordapp\.com\/invite)\//;
      if (linkRegex.test(message.content) && !hasIgnoredRole && !isIgnoredChannel) {
        message.delete();
        message.reply("Les liens d'invitation ne sont pas autorisés ici.");
      }
    }
  }
};