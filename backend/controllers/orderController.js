const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const Order = require('../models/Order');
const Product = require('../models/Product');

//Create Order
const newOrder = asyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({ success: true, order });
});

//Get Single Order
const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (!order) {
    return next(new ErrorResponse('Order not found', 400));
  }

  res.status(200).json({ success: true, order });
});

//Get my Order
const myOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({ success: true, orders });
});

//Get all Orders By Admin
const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({ success: true, totalAmount, orders });
});

//Update Order Status By Admin
const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse('Order not found with this Id', 404));
  }

  if (order.orderStatus === 'Delivered') {
    return next(
      new ErrorResponse('You have already delivered this order', 400)
    );
  }

  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

//Delete Order
const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse('Order not found with this Id', 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  newOrder,
  getOrder,
  myOrders,
  getOrders,
  updateOrderStatus,
  deleteOrder,
};
