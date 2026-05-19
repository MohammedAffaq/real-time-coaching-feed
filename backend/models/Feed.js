const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feed", feedSchema);