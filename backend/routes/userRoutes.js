const {
  getUserDetails,
  changePassword,
  updateProfile,
  getUsersByAdmin,
  getUserByAdmin,
} = require('../controllers/userController');

const router = require('express').Router();

const { protect, authorizeRoles } = require('../middlewares/auth');

router.get('/me', protect, getUserDetails);
router.put('/change/password', protect, changePassword);
router.put('/update/profile', protect, updateProfile);
router.get('/', protect, authorizeRoles('admin'), getUsersByAdmin);
router.get('/:id', protect, authorizeRoles('admin'), getUserByAdmin);

module.exports = router;
