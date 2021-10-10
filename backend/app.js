const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./middlewares/error');

//Importing Route Files
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

//Midlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

//Importing Routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);

module.exports = app;
