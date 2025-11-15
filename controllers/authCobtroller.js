const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

// Register User
module.exports.registerUser = async (req, res) => {
  try {
    const { email, fullname, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) return res.status(400).send("You already have an account");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      fullname,
      password: hash,
    });

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    res.status(201).send({ message: "User registered", token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// Login User
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).send("Email or password is incorrect");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Email or password is incorrect");

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    res.send({ message: "Login successful", token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
