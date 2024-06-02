const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../middleware/cloudinary.middleware');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Product = require('../models/product.schema');
const { asyncHandler } = require('../utils/asyncHandler');
const verifyJWT = require('../middleware/auth.middleware');

router.get('/getproducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);

    } catch (error) {
        console.error(err);
        res.status(500).send('Server error');
    }
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products',
        format: async (req, file) => 'jpg',
        public_id: (req, file) => file.fieldname + '-' + Date.now(),
    },
});

const upload = multer({ storage: storage });

router.post('/addproduct', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 10 }]), async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category
        } = req.body;

        const thumbnail = req.files['thumbnail'][0].path;
        const images = req.files['images'].map(file => file.path);

        const newProduct = new Product({
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            thumbnail,
            images
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.post('/deleteproduct', verifyJWT ,asyncHandler(async(req,res)=>{
    const {_id} = req.body;
    const product = await Product.findById(_id);

    if(!product){
        res.status(404).json({message:"Product not found"});
    }
    await Product.findByIdAndDelete(_id);
    
    res.status(200).json({message:"Product deleted sucessfully"});
}))

router.get('/product/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
    } else {
        res.status(200).json(product);
    }
}));

module.exports = router;
