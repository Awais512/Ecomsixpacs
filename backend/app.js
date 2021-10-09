const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error');

//Midlewares
app.use(express.json());
app.use(morgan('dev'));

//Importing Routes
app.use('/api/v1/products', productRoutes);

app.use(errorHandler);

module.exports = app;
