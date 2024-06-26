const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../config/generateToken.js");
const bcrypt = require("bcryptjs");
const { errorHandler } = require("../utils/error.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the details");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Wrong email or password" });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    pic: user.pic,
    token: generateToken(user._id),
  });
});

const allUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
module.exports = { registerUser, authUser, allUser };
