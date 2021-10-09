const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });
const connectDb = require('./config/db');

//Database Connection
connectDb();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
