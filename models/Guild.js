const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  plugins: {
    type: Object,
    default: {
      welcome: {
        enabled: false,
        message: null,
        channel: null,
      },
      goodbye: {
        enabled: false,
        message: null,
        channel: null,
      },
      autorole: {
        enabled: false,
        role: null,
      },
      antilink: {
        enabled: false,
        ignoredChannel: [],
        ignoredRole: [],
      },
      fortniteshop: {
        enabled: false,
        channel: null,
      },
      logs: {
        enabled: false,
        channel: null,
      },
    },
  },
});

const Guild = mongoose.model("Guild", guildSchema);

module.exports = Guild;