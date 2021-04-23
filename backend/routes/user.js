const router = require("express").Router();
const User = require("../models/User");
const Types = require("mongoose").Types;
const { returnHashedPassowrd } = require("../util");

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
    const ID = Types.ObjectId(data["_id"]);
    if (data["password"] !== undefined) {
      const hashedPassword = await returnHashedPassowrd(data["password"]);
      await User.updateOne(
        {
          _id: ID,
        },
        {
          $set: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword,
          },
        }
      );
    } else {
      await User.updateOne(
        {
          _id: ID,
        },
        {
          $set: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          },
        }
      );
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
