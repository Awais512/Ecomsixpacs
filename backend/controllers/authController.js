const User = require('../models/User');
const asyncHandler = require('express-async-handler');

//Register User
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'Sample Id',
      url: 'profilePicUrl',
    },
  });
  const token = user.getJWTToken();
  user.password = undefined;
  res.status(201).json({ success: true, token, user });
});

//Login User
const login = asyncHandler(async (req, res, next) => {});

module.exports = { register, login };
