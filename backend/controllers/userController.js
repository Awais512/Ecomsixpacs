const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const sendToken = require('../utils/jwtToken');
const cloudinary = require('cloudinary');

//Get User Details
const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});

//Get User Details
const changePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorResponse('Old Password is incorrect', 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorResponse('Password does not match', 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

const updateProfile = asyncHandler(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatar',
      width: 150,
      crop: 'scale',
    });

    newData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true });
});

//Get all Users By Admin
const getUsersByAdmin = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ success: true, users });
});

//Get  User By Admin
const getUserByAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }
  res.status(200).json({ success: true, user });
});

//Update Profile By Admin
const updateUser = asyncHandler(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, user });
});

//Delete Profile By Admin
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }
  await user.remove();
  res.status(200).json({ success: true, message: 'User Deleted Successfully' });
});

module.exports = {
  getUserDetails,
  changePassword,
  updateProfile,
  getUsersByAdmin,
  getUserByAdmin,
  updateUser,
  deleteUser,
};
