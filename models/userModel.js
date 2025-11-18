const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add the username "],
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "please add your email id"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "please enter the password"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
