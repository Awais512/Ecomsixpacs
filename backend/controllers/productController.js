const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

//Get All Products
const getProducts = asyncHandler(async (req, res, next) => {
  res.send('All Products');
});

//Get Single Product
const getProduct = asyncHandler(async (req, res, next) => {
  res.send('Single Products');
});

//Create New Product
const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({ success: true, product });
});

//Update Product
const updateProduct = asyncHandler(async (req, res, next) => {
  res.send('Update Product');
});

//Delete Product
const deleteProduct = asyncHandler(async (req, res, next) => {
  res.send('Delete Product');
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
