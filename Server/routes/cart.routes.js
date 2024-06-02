const express = require('express');
const router = express.Router();
const Product = require('../models/product.schema');
const User = require('../models/user.schema');
const  verifyJWT  = require('../middleware/auth.middleware');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');


router.post('/add', verifyJWT, asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const user = req.user;

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, 'Product not found.');
    }

    if (user.cart.includes(productId)) {
        throw new ApiError(400, 'Product already in cart.');
    }

    user.cart.push(productId);
    await user.save();

    return res.status(200).json(new ApiResponse(200, user.cart, 'Product added to cart successfully.'));
}));


router.get('/cartitems', verifyJWT, asyncHandler(async (req, res) => {
    const user = req.user;

    const userWithCart = await User.findById(user._id).populate('cart');
    if (!userWithCart) {
        throw new ApiError(404, 'User not found.');
    }

    return res.status(200).json(new ApiResponse(200, userWithCart.cart, 'Cart items fetched successfully.'));
}));

router.post('/remove', verifyJWT, asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const user = req.user;

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, 'Product not found.');
    }

    const productIndex = user.cart.indexOf(productId);
    if (productIndex === -1) {
        throw new ApiError(400, 'Product not in cart.');
    }

    user.cart.splice(productIndex, 1);
    await user.save();

    return res.status(200).json(new ApiResponse(200, user.cart, 'Product removed from cart successfully.'));
}));


module.exports = router;
