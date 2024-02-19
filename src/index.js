//require('dotenv').config({path: './env'})

import dotenv from 'dotenv';
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
});

connectDB()//as async returns a promise
.then( () =>{
    app.on('error' , (error) =>{
        console.log("Error: ", error);
    })

    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((error) =>{
    console.log('MongoDB connection failed !! ');
})

