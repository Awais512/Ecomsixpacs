const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middlewares/auth');

const router = require('express').Router();

router.route('/').get(protect, getProducts).post(createProduct);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
