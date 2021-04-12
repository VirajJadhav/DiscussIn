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
    const room = await Room.findOne({ roomID: data.roomID, title });
    if (room) {
      res.status(403).json({
        result:
          "Room Already exists, please choose another title or join existing !",
      });
    } else {
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
    }
  } catch (error) {
    res.status(400).json({
      result: "Error, room not added !",
    });
  }
});

module.exports = router;
