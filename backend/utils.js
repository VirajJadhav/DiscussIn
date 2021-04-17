const bcrypt = require("bcrypt");

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

module.exports = { compareHashedPassword, returnHashedPassowrd };
