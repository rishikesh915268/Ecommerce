const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors');



//  MODULES FOR DUMPING DATA OF API INTO MONGODB COLLECTION OF PRODUCT
// const axios = require('axios');
// const Product = require('./models/product.schema');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

const options = {
    origin: 'http://localhost:4200',
    credentials: true,
};

app.use(cors(options));

const port = process.env.PORT || 3000;

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error: ', err));

//  Routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const productsRoute = require('./routes/products.routes')
app.use('/api/product', productsRoute);

const cartRoutes = require('./routes/cart.routes')
app.use('/api/cart',cartRoutes);

const favRoutes = require('./routes/favourite.routes')
app.use('/api/favourite',favRoutes);


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

//  Function to insert data from api into MongoDB
// const fetchAndInsertData = async () => {
//     try {

//         const response = await axios.get("https://dummyjson.com/products");
//         const products = response.data.products;
//         console.log(products);
        
//         // await Product.insertMany(products);
//         // console.log('Data inserted successfully');

//         mongoose.connection.close();
//     } catch (error) {
//         console.error('Error fetching or inserting data:', error);
//         mongoose.connection.close();
//     }
// };
// fetchAndInsertData();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
