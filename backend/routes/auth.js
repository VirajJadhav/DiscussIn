const router = require("express").Router();
const User = require("../models/User");
const { compareHashedPassword, returnHashedPassowrd } = require("../utils");

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

router.route("/").get(async (req, res) => {
  try {
    res.status(200).send("Hello !");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
