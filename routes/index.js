var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {nav:false});
});

router.get("/register", function (req, res, next) {
  res.render("register", {nav:false});
});

module.exports = router;
