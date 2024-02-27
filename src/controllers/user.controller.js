// import { asyncHandler } from '../utils/asyncHandler.js';
// import { ApiError } from '../utils/ApiError.js';
// import { User } from '../models/user.model.js';
// import { ApiResponse } from '../utils/ApiResponse.js';
// import { uploadOnCloudinary } from '../utils/cloudinary.js';


// const registerUser = asyncHandler( async (req,res) =>{
//     //1. get user details from front-end
//     //2. validation
//     //3. user exists or not:  check username or email
//     //4. check for imgs , and for avatars
//     //5. upload them to cloudinary , avatars
//     //6. create user object - create entry in DB
//     //7. remove password and refresh token field from response --- imp
//     //8. check for user creation
//     //9. return res

//     const {fullname, email, username, password} = req.body
//     console.log("email", email);

//     //1.

//     if(fullname === ""){
//         throw new ApiError(400 , 'fullname is required');
//     }

//     // or 2.
//     if(
//         [ fullname, email, username, password].some((field) =>
//             field?.trim() === ""
//         )
//     ){
//         throw new ApiError( 400, "all fields are required")
//     }

//     //3.
//     const existedUser = await User.findOne({
//         $or:[ {username}, {email}]//imp
//     })

//     if(existedUser){
//         throw new ApiError( 409, "User with email or username already existed")
//     }

//     //4.
//     // const avatarLocalpath = req.files?.avatar[0].path;
//     const avatarLocalpath = req.files?.avatar && req.files.avatar[0]?.path;

//     // const coverImageLocalpath = req.files?.coverImage[0];
//     const coverImageLocalpath = req.files?.coverImage && req.files.coverImage[0];

//     // if(!avatarLocalpath){
//     //     throw new  ApiError( 400, "file required")
//     // }

//     if (!avatarLocalpath) {
//         // Handle the case where avatarLocalpath is undefined
//         console.error('Avatar path is undefined');
//         // Respond with an error to the client or take appropriate action
//     } else {
//         // Continue with your code using avatarLocalpath
//     }
    

//     //5.
//     const avatar =await uploadOnCloudinary(avatarLocalpath);
//     const coverImage =await uploadOnCloudinary(coverImageLocalpath);

//     if (!avatar || !avatar.url) {
//         throw new ApiError(400, "Avatar upload failed");
//     }

//     //6.
//     const user = await User.create({
//         fullname,
//         avatar:avatar.url,
//         coverImage:coverImage?.url || "",
//         email,
//         password,
//         username:username.toLowerCase(),
//     })

//     //7.
//     const createdUser = await User.findById(user._id).select(
//         "-password -refreshToken"//select the field to delete/remove
//     )


//     //8.
//     if(!createdUser){
//         throw new ApiError( 500, "Something went wrong while registering the user")
//     }

//     //9.
//     return res.status(201).json(
//         new ApiResponse(200, createdUser, "User registered successfully")
//     );




// })

// export {registerUser};


import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";



const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullName, email, username, password } = req.body
    //console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )

export { registerUser };