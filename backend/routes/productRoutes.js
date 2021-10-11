const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  createOrUpdateReview,
  getAllProductReviews,
  deleteProductReviews,
} = require('../controllers/productController');
const { protect, authorizeRoles } = require('../middlewares/auth');

const router = require('express').Router();

router
  .route('/review')
  .put(protect, createOrUpdateReview)
  .get(getAllProductReviews)
  .delete(protect, deleteProductReviews);

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
