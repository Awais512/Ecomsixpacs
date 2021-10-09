const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

//Get All Products
const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
});

//Get Single Product
const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({ success: true, product });
});

//Create New Product
const createProduct = asyncHandler(async (req, res, next) => {
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

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
