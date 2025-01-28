const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: String,
  profileImage: {
    type: String,
    default:
      "https://imgs.search.brave.com/1znjoGYkHSPtn4cPUifMl98lGSgUoUryIqqFdX62pmI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzhjL2Q2/LzFhLzhjZDYxYWU5/ZjRmYmMzMDA0YTZj/ZjY2MGU2M2IwNDQ2/LmpwZw",
  },
  boards: {
    type: Array,
    default: [],
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
