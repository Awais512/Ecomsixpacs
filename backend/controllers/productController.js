const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const ApiFeatures = require('../utils/apiFeatures');

//Get All Products
const getProducts = asyncHandler(async (req, res, next) => {
  const resultPerPage = 2;
  const productCount = await Product.countDocuments();
  if (req.query.page) {
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    const products = await apiFeatures.query;

    res
      .status(200)
      .json({ success: true, count: products.length, productCount, products });
  } else {
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();
    const products = await apiFeatures.query;
    res
      .status(200)
      .json({ success: true, count: products.length, productCount, products });
  }
});

//Get Single Product
const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({ success: true, product });
});

//Create New Product
const createProduct = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({ success: true, product });
});

//Update Product
const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product not found' });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ success: true, product });
});

//Delete Product
const deleteProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product not found' });
  }

  product = await Product.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: 'Product Deleted Successfully' });
});

//Create Or Update Review
const createOrUpdateReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createOrUpdateReview,
};
