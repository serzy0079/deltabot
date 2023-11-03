const { REST, Routes, Client, ActivityType } = require("discord.js");
const config = require("../config");
const fs = require("fs");
const mongoose = require("mongoose");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`[BOT] Je suis connecté à ${client.user.tag}.`)
        
        //require("../app")(client);
        
        mongoose.connect("mongourl", { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`[MONGODB] Je me suis connecté avec succès !`)

        client.user.setPresence({
            activities: [{ name: `/help | @moi | ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateur(s)`, type: ActivityType.Watching }]
        });

        const commandsFiles = fs.readdirSync("./commands/").filter((file) => file.endsWith(".js"));
        for (const file of commandsFiles) {
            let { data } = require(`../commands/${file}`);
            data.name = file.replace(/\.[^.]*$/, "");
            client.application.commands.create(data).then(() => {
                console.log(`[SLASH] /${data.name} functional!`);
            }).catch(({ stack }) => {
                console.error(`[ERROR] La commande slash "${data.name}" a rencontré une erreur :`, stack);
            });
        };
        
        const rest = new REST({ version: '10' }).setToken(config.bot.token);

        /*rest.put(Routes.applicationCommands(client.user.id), { body: [] })
            .then(() => console.log('J\'ai supprimé toutes les commandes slash !'))
            .catch(console.error);*/
    }
}