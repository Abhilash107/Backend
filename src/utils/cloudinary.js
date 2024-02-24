import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from 'fs';

          
cloudinary.config({ 
  cloud_name: process.env.CLODINARY_CLOUD_NAME  , 
  api_key: process.env.CLODINARY_API_KEY , 
  api_secret: process.env.CLODINARY_API_SECRET
});


const uplaodOnCloudinary = async (localFilePath) =>{
    try {
        if (!localFilePath) {
            return null; 
        }
        await cloudinary.uploader.upload(localFilePath, {
            resource_type:'auto'
        
        })
        //file has been uploaded successfully
        console.log('file uploaded on cloudinary',response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath);
        //removes the locally saved temp file

        return null;
        
    }
}



cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });