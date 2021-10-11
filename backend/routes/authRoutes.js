const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  changePassword,
  updateProfile,
} = require('../controllers/authController');
const { protect, authorizeRoles } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
router.get('/me', protect, getUserDetails);
router.put('/change/password', protect, changePassword);
router.put('/update/profile', protect, updateProfile);

module.exports = router;
