import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


const registerUser = asyncHandler( async (req ,res) =>{
    //1. get user details from front-end
    //2. validation
    //3. user exists or not:  check username or email
    //4. check for imgs , and for avatars
    //5. upload them to cloudinary , avatars
    //6. create user object - create entry in DB
    //7. remove password and refresh token field from response --- imp
    //8. check for user creation
    //9. return res
    console.log("req.files:", req);

    const {fullname, email, username, password} = req.body
    //console.log("email", email);

    //1.

    if(fullname === ""){
        throw new ApiError(400 , 'fullname is required');
    }

    // or 2.
    if(
        [ fullname, email, username, password].some((field) =>
            field?.trim() === ""
        )
    ){
        throw new ApiError( 400, "all fields are required")
    }

    //3.
    const existedUser = await User.findOne({
        $or:[ {username}, {email}]//imp
    })

    if(existedUser){
        throw new ApiError( 409, "User with email or username already existed")
    }

    //4.
    // const avatarLocalpath = req.files?.avatar[0].path;
    const avatarLocalpath = req.files?.avatar && req.files.avatar[0]?.path;

    // const coverImageLocalpath = req.files?.coverImage[0];
    //const coverImageLocalpath = req.files?.coverImage && req.files.coverImage[0];

    // if(!avatarLocalpath){
    //     throw new ApiError( 400, "file required")
    // }

    if (!req.files || !req.files.avatar || !req.files.avatar[0] || !req.files.avatar[0].path){
        throw new ApiError(400, "Avatar file required");
    }

    //5.
    const avatar =await uploadOnCloudinary(avatarLocalpath);
    //const coverImage =await uploadOnCloudinary(coverImageLocalpath);

    if (!avatar || !avatar.url) {
        throw new ApiError(400, "Avatar upload failed");
    }

    //6.
    const user = await User.create({
        fullname,
        avatar:avatar.url,
        //coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase(),
    })

    //7.
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"//select the field to delete/remove
    )


    //8.
    if(!createdUser){
        throw new ApiError( 500, "Something went wrong while registering the user")
    }

    //9.
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );

})

export { registerUser };











// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.model.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// const registerUser = asyncHandler(async (req, res) => {
//     const { fullName, email, username, password } = req.body;

//     // Check if any required field is empty
//     if ([fullName, email, username, password].some((field) => !field || field.trim() === "")) {
//         throw new ApiError(400, "All fields are required");
//     }

//     // Check if user already exists
//     const existedUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existedUser) {
//         throw new ApiError(409, "User with email or username already exists");
//     }

//     // Retrieve avatar file path
//     const avatarLocalpath = req.files?.avatar && req.files.avatar[0]?.path;
//     if (!avatarLocalpath) {
//         console.error('Avatar path is undefined'); 
//     }

//     // Upload avatar to Cloudinary
//     let avatar;
//     try {
//         avatar = await uploadOnCloudinary(avatarLocalpath);
//     } catch (err) {
//         console.error("Error uploading avatar to Cloudinary:", err);
//         throw new ApiError(500, "Error occurred while uploading avatar");
//     }
//     console.log(req.files);

//     if (!avatar || !avatar.url) {
//         throw new ApiError(400, "Avatar upload failed");
//     }

//     // Create user with uploaded avatar URL
//     const user = await User.create({
//         fullName,
//         avatar: avatar.url,
//         email,
//         password,
//         username: username.toLowerCase(),
//     });

//     // Fetch created user data without sensitive fields
//     const createdUser = await User.findById(user._id).select("-password -refreshToken");

//     if (!createdUser) {
//         throw new ApiError(500, "Something went wrong while registering the user");
//     }

//     // Send successful response
//     return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
// });

// export { registerUser };










































