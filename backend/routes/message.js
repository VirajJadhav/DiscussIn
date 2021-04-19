const router = require("express").Router();
const Message = require("../models/Message");

router.route("/").post(async (req, res) => {
  try {
    const { messageList } = req.body;
    const newMessageList = messageList.map(message => {
      return {
        updateOne: {
          filter: {
            message: message.message,
            messageDate: message.messageDate,
          },
          update: { $set: message },
          upsert: true,
        },
      };
    });

    await Message.bulkWrite(newMessageList);
    res.status(200).json({
      result: "Chat Saved !",
    });
  } catch (error) {
    res.status(400).json({
      result: error.message,
    });
  }
});

router.route("/room/:roomID").get(async (req, res) => {
  try {
    const roomID = req.params.roomID;
    const roomMessages = await Message.find({ roomID });
    res.status(200).json({
      result: roomMessages,
    });
  } catch (error) {
    res.status(400).json({
      result: error.message,
    });
  }
});

router.route("/room").post(async (req, res) => {
  try {
    const { roomID } = req.body;
    await Message.deleteMany({ roomID });
    res.status(200).json({
      result: "Chat Cleared",
    });
  } catch (error) {
    res.status(400).json({
      result: error.message,
    });
  }
});

module.exports = router;
