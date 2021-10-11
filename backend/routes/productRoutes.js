const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  createOrUpdateReview,
} = require('../controllers/productController');
const { protect, authorizeRoles } = require('../middlewares/auth');

const router = require('express').Router();

router.route('/review').put(protect, createOrUpdateReview);

router
  .route('/')
  .get(getProducts)
  .post(protect, authorizeRoles('admin'), createProduct);
router
  .route('/:id')
  .get(getProduct)
  .put(protect, authorizeRoles('admin'), updateProduct)
  .delete(protect, authorizeRoles('admin'), deleteProduct);

module.exports = router;
