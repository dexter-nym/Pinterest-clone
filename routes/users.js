var express = require("express");
var router = express.Router();

// Mongoose connection
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
mongoose.connect("mongodb://127.0.0.1:27017/pin");

const upload = require("./multer");

// Models
const userModel = require("../models/register");
const postModel = require("../models/post");

passport.use(new localStrategy(userModel.authenticate()));

// Users Get routes
router.get("/profile", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    _id: req.session.passport.user,
  });
  res.render("profile", { user, nav: true });
});
router.get("/add", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    _id: req.session.passport.user,
  });
  res.render("add", { user, nav: true });
});
router.get("/logout", isLoggedIn, function (req, res, next) {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (error) {
    res.render("error", { error });
  }
});

/* Auth users listing. */
router.post("/register", function (req, res, next) {
  let { username, email, password } = req.body;
  try {
    const user = new userModel({
      username,
      email,
    });
    userModel.register(user, password).then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/users/profile");
      });
    });
  } catch (error) {
    res.render("error", error);
  }
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/users/profile",
  }),
  function () {}
);

/* Profile users listing */
router.post(
  "/fileupload",
  isLoggedIn,
  upload.single("image"),
  async function (req, res, next) {
    const user = await userModel.findOne({
      _id: req.session.passport.user,
    });
    user.profileImage = "/images/" + req.file.filename;
    await user.save();
    res.render("profile", { user });
  }
);
router.post(
  "/createpost",
  isLoggedIn,
  upload.single("image"),
  async function (req, res) {
    try {
      const user = await userModel.findOne({ _id: req.session.passport.user });
      const { title, description } = req.body;
      const post = await postModel.create({
        title,
        description,
        postImage,
      });
    } catch (error) {
      res.render("error", error);
    }
  }
);

// Middlewares
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
