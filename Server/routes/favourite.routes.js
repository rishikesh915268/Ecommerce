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

    if (user.favourite.includes(productId)) {
        throw new ApiError(400, 'Product already marked as favourite.');
    }

    user.favourite.push(productId);
    await user.save();

    return res.status(200).json(new ApiResponse(200, user.favourite, 'Product marked as favourite.'));
}));


router.get('/favitems', verifyJWT, asyncHandler(async (req, res) => {
    const user = req.user;

    const userWithfav = await User.findById(user._id).populate('favourite');
    if (!userWithfav) {
        throw new ApiError(404, 'User not found.');
    }

    return res.status(200).json(new ApiResponse(200, userWithfav.favourite, 'Favourite items fetched successfully.'));
}));

router.post('/remove', verifyJWT, asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const user = req.user;

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, 'Product not found.');
    }

    const productIndex = user.favourite.indexOf(productId);
    if (productIndex === -1) {
        throw new ApiError(400, 'Product not marked as favourite.');
    }

    user.favourite.splice(productIndex, 1);
    await user.save();

    return res.status(200).json(new ApiResponse(200, user.favourite, 'Product removed from favourite.'));
}));


router.post('/status', verifyJWT, asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const user = req.user;

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, 'Product not found.');
    }

    const isFav = user.favourite.includes(productId);

    return res.status(200).json(new ApiResponse(200, { isFav }, 'Favourite status fetched successfully.'));
}));

module.exports = router;
