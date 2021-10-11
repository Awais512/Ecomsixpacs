const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);

module.exports = router;
