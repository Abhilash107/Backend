import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { response } from 'express';


const genAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken= refreshToken;
        await user.save({ValidateBeforeSave: false});
        return{accessToken , refreshToken}
    } catch (error) {
        throw new ApiError(500, 'Something went wrong')
        
    }
}


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

    //1.
    const {fullname, email, username, password} = req.body
    //console.log("email", email);
    //console.log(req.files);

     // or 2.
    if(fullname === ""){
        throw new ApiError(400 , 'fullname is required');
    }

   
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
    const coverImageLocalpath = req.files?.coverImage && req.files.coverImage[0];

    // if(!avatarLocalpath){
    //     throw new ApiError( 400, "file required")
    // }

    if (!req.files || !req.files.avatar || !req.files.avatar[0] || !req.files.avatar[0].path){
        throw new ApiError(400, "Avatar file required");
    }

    //5.
    const avatar =await uploadOnCloudinary(avatarLocalpath);
    const coverImage =await uploadOnCloudinary(coverImageLocalpath);

    if (!avatar || !avatar.url) {
        throw new ApiError(400, "Avatar upload failed");
    }

    //6.
    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
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

const loginUser = asyncHandler(async (req, res) =>{
    //1. req body ->
    //2. username or email
    //3. find the user 
    //4. password check
    //5. access and refresh token
    //6. send cookies and response

    //1.
    const {email, username,password} = req.body;

    //2.
    if(!username || !email){
        throw new ApiError(400,'username or email is required')
    }

    //3. (imp) $or in mongoDB
    const user = await User.findOne({
        $or: [{username},{email}]
    })
    if (!user) {
        throw new ApiError(400, 'User does not exist')
        
    }

    //4. checking password using bcrypt

    const isPasswordvalid = await user.isCorrectPassword(password);
    if (!isPasswordvalid) {
        throw new ApiError(401, 'password user credentials')  
    }
    //5. genAccessAndRefreshTokens method is defined above
    const {accessToken, refreshToken}=await genAccessAndRefreshTokens(user._id);
    //await used due to database opeerations

    //6.
    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken")

    const option ={
        httpOnly: true,
        secure:true,

    }
    return res.status(200)
    .cookie('accessToken', accessToken,option)
    .cookie('refreshToken', refreshToken,option)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User logged in successfully"
        )

    )
})

const logoutUser = asyncHandler(async (req, res)=> {
    await User.findByIdAndUpdate(req.user._id,{
        $set:{
            refreshToken:undefined,  
        }   
    },
    {
        new:true

    })    

})

export { registerUser, loginUser,logoutUser };










































