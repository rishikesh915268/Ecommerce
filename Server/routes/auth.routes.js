const express = require('express');
const router = express.Router();
const User = require('../models/user.schema');
const verifyJWT = require('../middleware/auth.middleware');
const {asyncHandler} = require('../utils/asyncHandler');
const {ApiError} = require('../utils/ApiError');
const {ApiResponse} = require('../utils/ApiResponse');

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Error in generating referesh and access token")
    }
}


router.post('/register',asyncHandler( async (req, res) => {
    const {name, email, username, password } = req.body
    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(409, "User with email already exists")
    }

    const user = await User.create({
        name,
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Error in registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} ))


router.post('/login',asyncHandler(async (req, res) =>{
    const {email,password} = req.body
    // console.log(email);

    if (!email) {
        throw new ApiError(400, "email is required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.comparePassword(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect Password")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

}))

router.post('/logout',verifyJWT, asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { $set: {refreshToken: undefined}},
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
}))

module.exports = router;
