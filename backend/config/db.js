const mongoose = require('mongoose');

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Mongodb Connected'))
    .catch((err) => console.log(err));
};

module.exports = connectDb;
