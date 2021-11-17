const hash = require("../utils/bcryptjs/hashPassword");
const passwordChecker = require("../utils/bcryptjs/comparePassword");
const tokenSign = require("../utils/jwt/sign");
const User = require("../models/User/User");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(422).send({ message: "email missing" });
    }
    if (!password) {
      return res.status(422).send({ message: "email missing" });
    }

    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }

    user = new User(req.body);

    const hashedPassword = await hash(password);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).send({ message: "signup successful" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).send({ message: "email missing" });
    }
    if (!password) {
      return res.status(422).send({ message: "email missing" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: [{ msg: "No account found against these credentials." }],
      });
    }

    const match = await passwordChecker(`${password}`, user.password);

    if (!match) {
      return res.status(409).json({ error: [{ msg: "Invalid credentials" }] });
    }

    const token = await tokenSign(user);

    return res.status(200).json({ token: token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Server error" });
  }
};
