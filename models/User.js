const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  economy: {
    rep: {
      type: Number,
      default: 0,
    },
  },
  bio: {
    type: String,
    default: "",
  },
  birthdate: {
    type: Number,
    default: null,
  },
  registeredAt: {
    type: Number,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;