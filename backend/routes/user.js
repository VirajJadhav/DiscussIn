const router = require("express").Router();
const User = require("../models/User");
const Room = require("../models/Room");
const Message = require("../models/Message");
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

router.route("/delete/:userID").delete(async (req, res) => {
  try {
    const userName = req.params.userID;
    let rooms = await Room.find({ userName });
    let parsedRooms = JSON.parse(JSON.stringify(rooms));
    if (parsedRooms !== undefined && parsedRooms.length !== 0) {
      for (let i = 0; i < parsedRooms.length; i++) {
        await Message.deleteMany({ roomID: parsedRooms[i].roomID });
      }
      await Room.deleteMany({ userName });
    }
    await User.deleteOne({ userName });
    res.status(200).json({
      result: "User data deleted !",
    });
  } catch (error) {
    res.status(400).json({
      result: "Failed to delete user data !",
    });
  }
});

module.exports = router;
