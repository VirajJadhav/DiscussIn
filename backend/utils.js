const bcrypt = require("bcrypt");
const axios = require("axios");
const config = require("config");

async function compareHashedPassword(password, dbpassword) {
  try {
    const compared = await bcrypt.compare(password, dbpassword);
    return compared;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

async function returnHashedPassowrd(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error.message);
    return password;
  }
}

async function deleteRoom(roomID) {
  try {
    const backendURL = config.get("backendURL");
    const response = await axios.delete(`${backendURL}/room/delete/${roomID}`);
    return response.data.result;
  } catch (error) {
    return false;
  }
}

module.exports = { compareHashedPassword, returnHashedPassowrd, deleteRoom };
