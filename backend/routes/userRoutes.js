const {
  getUserDetails,
  changePassword,
  updateProfile,
} = require('../controllers/userController');

const router = require('express').Router();

const { protect, authorizeRoles } = require('../middlewares/auth');

router.get('/me', protect, getUserDetails);
router.put('/change/password', protect, changePassword);
router.put('/update/profile', protect, updateProfile);

module.exports = router;
