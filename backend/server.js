const app = require('./app');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
dotenv.config({ path: 'backend/config/config.env' });
const connectDb = require('./config/db');

//Database Connection
connectDb();
//Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
