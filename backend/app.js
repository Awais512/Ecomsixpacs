const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const morgan = require('morgan');

//Midlewares
app.use(express.json());
app.use(morgan('dev'));

//Importing Routes
app.use('/api/v1/products', productRoutes);

module.exports = app;
