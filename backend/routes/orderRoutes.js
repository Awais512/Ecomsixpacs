const router = require('express').Router();

const {
  newOrder,
  getOrder,
  myOrders,
  getOrders,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const { protect, authorizeRoles } = require('../middlewares/auth');

router.route('/me').get(protect, myOrders);
router
  .route('/')
  .post(protect, newOrder)
  .get(protect, authorizeRoles('admin'), getOrders);
router
  .route('/:id')
  .get(protect, getOrder)
  .put(protect, authorizeRoles('admin'), updateOrderStatus)
  .delete(protect, authorizeRoles('admin'), deleteOrder);

module.exports = router;
