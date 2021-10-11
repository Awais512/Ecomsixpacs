const {
  getUserDetails,
  changePassword,
  updateProfile,
  getUsersByAdmin,
  getUserByAdmin,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = require('express').Router();

const { protect, authorizeRoles } = require('../middlewares/auth');

//User Routes
router.get('/me', protect, getUserDetails);
router.put('/change/password', protect, changePassword);
router.put('/update/profile', protect, updateProfile);
//Admin Routes
router.get('/', protect, authorizeRoles('admin'), getUsersByAdmin);
router.get('/:id', protect, authorizeRoles('admin'), getUserByAdmin);
router.put(
  '/admin/updateuser/:id',
  protect,
  authorizeRoles('admin'),
  updateUser
);

router.delete('/admin/:id', protect, authorizeRoles('admin'), deleteUser);

module.exports = router;
