const router = require('express').Router();

const { newOrder, getOrder } = require('../controllers/orderController');
const { protect, authorizeRoles } = require('../middlewares/auth');

router.route('/').post(protect, newOrder);
router.route('/:id').get(protect, getOrder);

module.exports = router;
