const router = require("express").Router();
const Room = require("../models/Room");

const { nanoid } = require("nanoid");

router.route("/add").post(async (req, res) => {
  try {
    const { title, subTitle, description, status, userName } = req.body;
    const data = {
      title,
      subTitle,
      description,
      status,
      roomID: nanoid(),
      members: [],
      userName: userName || "",
    };
    const newRoom = new Room(data);
    const response = newRoom.save();
    response
      .then(result => {
        res.status(200).json({
          result,
        });
      })
      .catch(err => {
        res.status(500).json({
          result: "Error occured, while saving in database !",
        });
      });
  } catch (error) {
    res.status(400).json({
      result: error.message,
    });
  }
});

router.route("/:roomID").get(async (req, res) => {
  try {
    const roomID = req.params.roomID;
    const room = await Room.findOne({ roomID });
    if (room) {
      res.status(200).json({
        result: room,
      });
    } else {
      res.status(400).json({
        result: "Invalid room ID !",
      });
    }
  } catch (error) {
    res.status(400).json({
      result: error.message,
    });
  }
});

router.route("/userName/:roomID/:userName").get(async (req, res) => {
  try {
    const roomID = req.params.roomID;
    const userName = req.params.userName;
    const room = await Room.findOne({ roomID, userName });
    if (room) {
      res.status(200).json({
        result: room,
      });
    } else {
      res.status(400).json({
        result: "Invalid room details !",
      });
    }
  } catch (error) {
    res.status(400).json({
      result: error.message,
    });
  }
});

router.route("/status/:status").get(async (req, res) => {
  try {
    const status = req.params.status;
    const rooms = await Room.find({ status });
    res.status(200).json({
      result: rooms,
    });
  } catch (error) {
    res.status(400).json({
      result: error.message,
    });
  }
});

router.route("/userName/status/:userName/:status").get(async (req, res) => {
  try {
    const userName = req.params.userName;
    const status = req.params.status;
    const room = await Room.find({ userName, status });
    res.status(200).json({
      result: room,
    });
  } catch (error) {
    res.status(400).json({
      result: error.message,
    });
  }
});

module.exports = router;
