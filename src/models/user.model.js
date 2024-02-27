import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,//In MongoDB, an index is a data structure that improves the speed of data retrieval operations on a collection. By creating indexes on fields within a collection, MongoDB can quickly locate documents based on the indexed fields. This helps to efficiently execute queries and improve overall database performance.
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,

    },
    fullname:{
        type:String,    
        unique:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,  //cloudinary URL 
        required:true, 
        trim:true,
        index:true

    },
    coverImage:{
        type:String,

    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true, 'Password is required'],
        unique:true,
    },
    refreshToken:{
        type:String
    }
},
{
    timestamps:true
});


//Don't use arrow function inside .pre

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password= await bcrypt.hash(this.password, 10)//.hash("string",round)
    next()
})


userSchema.methods.isCorrectPassword = async function(password){
    return await bcrypt.compare(password, this.password);
    //boolean value
}

userSchema.methods.generateAccessToken = function(){
    return  jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY

        }
    )
}


userSchema.methods.generateRefreshToken = function(){
    return  jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )

}


export const User = mongoose.model("User",userSchema)


//Access Token:
// An access token is a credential used by a client application to access protected resources on behalf of a user.
// short-lived and limited validity period.
// Access tokens are sent with each request to the server to authenticate the user and authorize access to specific resources.
// These tokens grant access to resources based on the permissions granted to the associated user or client application.
// Access tokens are often bearer tokens, meaning that whoever possesses the token can use it to access the protected resources without further authentication.


// Refresh Token:
// A refresh token is a credential used to obtain a new access token after the current access token expires.
//  typically long-lived and longer validity period.
// Refresh tokens are securely stored on the client-side and are used to request new access tokens without requiring the user to re-authenticate.
// They provide a way to maintain continuous access to resources without prompting the user for credentials repeatedly.
// Refresh tokens are usually more sensitive than access tokens and require proper handling and security measures to prevent unauthorized access.