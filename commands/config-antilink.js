const config = require("../config");
const Guild = require("../models/Guild");

module.exports = {
  data: {
    name: "config-antilink",
    description: "Configurer le système d'antilink.",
    options: [
      {
        type: 5,
        name: "status",
        required: true,
        description: "True = Activé / False = Désactivé.",
      },
    ],
  },

  async exe(client, interaction) {
    const guildId = interaction.guild.id;
    const status = interaction.options.getBoolean("status");

    const guildData = await Guild.findOne({ id: guildId });

    if (!guildData) {
      return interaction.reply("<:warning:1168144663539097731> **Whoops!** Le serveur n'est pas enregistré dans la base de données.");
    }

    await Guild.updateOne(
      { id: guildId },
      { $set: { "plugins.antilink.enabled": status } }
    );

    interaction.reply("Les paramètre de `l'antilink` on été modifier.\n\n⚠️ *La commande risque d'être améliorer dans le prochaine upload du code !*");
  },
};