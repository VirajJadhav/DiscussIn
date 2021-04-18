const jwt = require("jsonwebtoken");
const config = require("config");

const authUser = async (req, res, next) => {
  const token = req.header("tokendiscussin");
  if (!token) {
    res.status(401).send("Invalid DiscussIn token");
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtDiscussInSecret"));
    req.headers["userID"] = decoded["userID"];
    next();
  } catch (error) {
    res.status(403).json({
      result: error.message,
    });
  }
};

module.exports = { authUser };
