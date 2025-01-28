const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  title: String,
  description: String,
  postImage: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

userSchema.plugin(plm);

module.exports = mongoose.model("post", userSchema);
