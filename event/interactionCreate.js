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
    }
};