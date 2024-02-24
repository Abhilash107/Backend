import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';


const registerUser = asyncHandler( async (req,res) =>{
    //1. get user details from front-end
    //2. validation
    //3. user exists or not:  check username or email
    //4. check for imgs , and for avatars
    //5. upload them to cloudinary , avatars
    //6. create user object - create entry in DB
    //7. remove password and refresh token field from response --- imp
    //8. check for user creation
    //9. return res

    const {fullname, email, username, password} = req.body
    console.log("email", email);

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
    const existedUser = User.findOne({
        $or:[ {username}, {email}]//imp
    })

    if(existedUser){
        throw new ApiError( 409, "User with email or username already existed")
    }

    //4.
    const avatarLocalpath = req.files?.avatar[0].path;
    const coverImageLocalpath = req.files?.coverImage[0];
    if(!avatarLocalpath){
        throw new ApiError( 400, "file required")
    }

    //5.
    const avatar = await uplaodOnCloudinary(avatarLocalpath);
    const coverImage = await uplaodOnCloudinary(coverImageLocalpath);

    if(!avatar){
        throw new ApiError( 400, "Avatar file is required")
    }

    //6.
    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
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

export {registerUser};
