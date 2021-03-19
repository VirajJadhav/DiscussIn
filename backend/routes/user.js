const router = require("express").Router();
const User = require("../models/User");

router.route("/").get(async (req, res) => {
  try {
    res.status(200).send("Hello !");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
