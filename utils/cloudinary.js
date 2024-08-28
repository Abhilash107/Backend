import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from 'fs';
       
cloudinary.config({ 
  cloud_name:process.env.CLODINARY_CLOUD_NAME, 
  api_key:process.env.CLODINARY_API_KEY, 
  api_secret:process.env.CLODINARY_API_SECRET
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null; 
        }
        
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });
        
        // File has been uploaded successfully
        fs.unlinkSync(localFilePath);
        return result;
    } catch (error) {
      
        // Removes the locally saved temp file
        console.error('Error uploading file to Cloudinary:', error);
        return null;
    }
};



