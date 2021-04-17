const router = require("express").Router();
const User = require("../models/User");
const { returnHashedPassowrd } = require("../utils");

router.route("/verify/:userName").get(async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName });
    res.status(200).json({
      result: user !== null,
    });
  } catch (error) {
    res.status(400).json({
      result: "User check failed !",
    });
  }
});

router.route("/:userName").get(async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName });
    res.status(200).json({
      result: user === null ? {} : user,
    });
  } catch (error) {
    res.status(400).json({
      result: "Failed to fetch user data !",
    });
  }
});

router.route("/update").post(async (req, res) => {
  try {
    const data = req.body;
    if (data["password"] !== undefined) {
      returnHashedPassowrd(data["password"])
        .then(hashedPassword => {
          data["password"] = hashedPassword;
          User.findOneAndUpdate(data["_id"], data);
        })
        .catch(error => console.log(error.message));
    } else {
      await User.findOneAndUpdate(data["_id"], data);
    }
    res.status(200).json({
      result: "User data updated !",
    });
  } catch (error) {
    res.status(400).json({
      result: "Failed to update user data !",
    });
  }
});

module.exports = router;
