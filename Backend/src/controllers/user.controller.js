import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while generating asccess and refresh token")
    }
}

const registerUser = asyncHandler(async(req, res) => {
    const {email, username, password} = req.body

    if(
        [email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or username already exist")
    }

    const user = await User.create({
        email,
        password,
        username: username.toLowerCase()
    })

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, createUser, "User registered successfully"))
})

const addPost = asyncHandler(async(req, res) => {
    const {postName, postDescription, postImage, userId} = req.body  

    if(
        [postName, postDescription, postImage, userId].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields aare required")
    }

    const post = await Post.create({
        postName,
        postDescription,
        postImage,
        userId
    })

    const createPost = await Post.findById(post._id)

    if(!createPost) {
        throw new ApiError(500, "Something went wrong while creating a post")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, createPost, "Post created successfully"))
})


const loginUser = asyncHandler( async (req, res) => {
    const {email, username, password} = req.body

    if(!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })
    
    if(!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid) {
        throw new ApiError(404, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

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
            "User logged in Successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req, res) => {
    console.log("REQ.USER: " , req.user);
    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged Out"))
})

const findUser = asyncHandler(async(req, res) => {   
    const user = await User.findById(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    const find = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!find) {
        throw new ApiError(500, "Something went wrong while finding user")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, find, "User founded"))
})


export {
    registerUser,
    loginUser,
    logoutUser,
    findUser,
    addPost
}