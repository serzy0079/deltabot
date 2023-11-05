const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js");
const config = require("../config");
const Guild = require("../models/Guild");
const User = require("../models/User");

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (interaction.type === Discord.InteractionType.ApplicationCommand) {
            const { exe } = require(`../commands/${interaction.commandName}`);

            const guildId = interaction.guildId;
            const userId = interaction.user.id;

            const guildData = await Guild.findOne({ id: guildId });

            if (!guildData) {
                const newGuild = new Guild({
                    id: guildId,
                });
                await newGuild.save();
            }

            const userData = await User.findOne({ id: userId });

            if (!userData) {
                const newUser = new User({
                    id: userId,
                });
                await newUser.save();
            }

            exe(client, interaction);
            console.log(`[SLASH] La commande slash "${interaction.commandName}" a été exécutée par ${interaction.user.tag}`);
        }
        
        if (interaction.customId === "toggleAntilink") {
  if (interaction.user.id === interaction.user.id) {
    const guildId = interaction.guild.id;

    const filter = (response) => {
      return ["activer", "désactiver"].includes(response.content.toLowerCase());
    };

    const embed = new EmbedBuilder()
       .setAuthor({ name: `Configuration - Auto-Modération -> Liens externes`, iconURL: `${client.user.displayAvatarURL()}` })
       .setDescription(`Voulez-vous \`activer\` ou \`désactiver\` le système antilink ? Répondez avec \`'activer'\` ou \`'désactiver'\`.`)
       .setImage(config.imageBot)
       .setColor(config.color.default);
    
    interaction.reply({ embeds: [embed], ephemeral: true });

    const collector = interaction.channel.createMessageCollector({
      filter,
      time: 30000,
    });

    collector.on("collect", async (response) => {
      const enableAntilink = response.content.toLowerCase() === "activer";

      await Guild.findOneAndUpdate(
        { id: guildId },
        { $set: { "plugins.antilink.enabled": enableAntilink } }
      );

      const embed = new EmbedBuilder()
         .setAuthor({ name: `Configuration - Auto-Modération -> Liens externes`, iconURL: `${client.user.displayAvatarURL()}` })
         .setDescription(`${enableAntilink ? "Le système antilink a été activé avec succès." : "Le système antilink a été désactivé avec succès."}`)
         .setImage(config.imageBot)
         .setColor(config.color.default);

      interaction.followUp({ embeds: [embed], ephemeral: true });
      collector.stop();
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        interaction.followUp(`${config.emoji.warning} La réponse n'a pas été reçue à temps. Le système antilink n'a pas été modifié.`);
      }
    });
  } else {
    interaction.reply(`${config.emoji.crossmarkbutton} Vous n'êtes pas autorisé à modifier la configuration du système antilink.`);
  }
}
    }
};