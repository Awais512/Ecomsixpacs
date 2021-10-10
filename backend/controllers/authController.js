const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const sendToken = require('../utils/jwtToken');

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
  sendToken(user, 201, res);
});

//Login User
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorResponse('Please Enter Email and Password', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user) return next(new ErrorResponse('Invalid Email Or Password', 404));

  const matchPassword = await user.comparePassword(password);
  if (!matchPassword) return next(new ErrorResponse('Invalid Password', 401));

  sendToken(user, 200, res);
});

module.exports = { register, login };
