const router = require("express").Router();
const User = require("../models/User");
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

router.route("/login").post(async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (user) {
      const parsedUser = JSON.parse(JSON.stringify(user));
      compareHashedPassword(password, parsedUser.password)
        .then(result => {
          if (result) {
            res.status(200).json({
              result: parsedUser,
            });
          } else
            res.status(403).json({
              result: "Please check your password !",
            });
        })
        .catch(error => console.log(error.message));
    } else {
      res.status(403).json({
        result: "Please complete your registration first !",
      });
    }
  } catch (error) {
    res.status(400).json({
      result: "User Login Failed !",
    });
  }
});

router.route("/signup").post(async (req, res) => {
  try {
    const { userName, firstName, lastName, email, password } = req.body;
    const user = await User.findOne({ userName });
    if (user) {
      res.status(403).json({
        result: "Username Already exists, please choose another one !",
      });
    } else {
      returnHashedPassowrd(password)
        .then(hashedPassword => {
          const newUser = new User({
            userName,
            firstName,
            lastName,
            email,
            password: hashedPassword,
          });
          newUser.save();
        })
        .catch(error => console.log(error.message));
      res.status(200).json({
        result: "User registered !",
      });
    }
  } catch (error) {
    res.status(400).json({
      result: "User Sign up Failed !",
    });
  }
});

router.route("/verify/user/:userName").get(async (req, res) => {
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

router.route("/user/:userName").get(async (req, res) => {
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

router.route("/").get(async (req, res) => {
  try {
    res.status(200).send("Hello !");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
