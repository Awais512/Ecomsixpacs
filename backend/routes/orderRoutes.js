const router = require('express').Router();

const {
  newOrder,
  getOrder,
  myOrders,
  getOrders,
} = require('../controllers/orderController');
const { protect, authorizeRoles } = require('../middlewares/auth');

router.route('/me').get(protect, myOrders);
router
  .route('/')
  .post(protect, newOrder)
  .get(protect, authorizeRoles('admin'), getOrders);
router.route('/:id').get(protect, getOrder);

module.exports = router;
