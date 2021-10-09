const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Product Name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please Enter Product Description'],
  },
  price: {
    type: Number,
    required: [true, 'Please Enter Product Price'],
    maxLength: [8, 'Price can not exceed 8 figures'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please Enter Product Category'],
  },

  stock: {
    type: Number,
    required: [true, 'Please Enter Product Stock'],
    maxLength: [4, 'Stock Can not exceed 4 Character'],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Product', productSchema);
