const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const Guild = require("../models/Guild");
const config = require("../config");

module.exports = {
  data: {
    name: "antilink",
    description: "Configurer le système d'antilink.",
  },

  async exe(client, interaction) {
    if (!interaction.member.permissions.has("Administrator")) {
      return interaction.reply({
        content: `${config.emoji.warning} Vous n'avez pas la permission d'utiliser cette commande. Veuillez demander à un administrateur de l'utiliser.`,
        ephemeral: true,
      });
    }

    const guildId = interaction.guild.id;
    const guildData = await Guild.findOne({ id: guildId });

    if (!guildData) {
      return interaction.reply(`${config.emoji.crossmarkbutton} Le serveur n'est pas enregistré dans la base de données.`);
    }

    const antilinkEnabled = guildData.plugins.antilink.enabled;
    const channelNull = guildData.plugins.antilink.ignoredChannel || null;
    const roleNull = guildData.plugins.antilink.ignoredRole || null;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `Configuration - Auto-Modération -> Liens externes`, iconURL: `${client.user.displayAvatarURL()}` })
      .setDescription(`Que souhaitez-vous configurer ?\n\n> **Statut** : \`${antilinkEnabled ? "Activé" : "Désactivé"}\`\n> **Rôles ignorés** : \`${roleNull ? `<@&${roleNull}>` : "Aucun rôles configuré"}\`\n> **Salons ignorés** : \`${channelNull ? `<#${channelNull}>` : "Aucun salons configuré"}\``)
      .setImage(config.imageBot)
      .setColor(config.color.default);

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("toggleAntilink")
          .setLabel("Activer/Désactiver")
          .setStyle(1),
        new ButtonBuilder()
          .setCustomId("addChannel")
          .setLabel("Ajouter/Retirer un Salon")
          .setStyle(1),
        new ButtonBuilder()
          .setCustomId("addRole")
          .setLabel("Ajouter/Retirer un Rôle")
          .setStyle(1),
      );

    interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  },
};