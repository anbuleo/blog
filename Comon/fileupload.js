import { v2 as cloudinary } from 'cloudinary';
import env from 'dotenv'
import Blog from '../Models/Blog.js ';

env.config()

let uploadImage = async function(path,next) {
    
    try {
        cloudinary.config({ 
            cloud_name:process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret // Click 'View API Keys' above to copy your API secret
        });
        
        // Upload an image
         const uploadResult = await cloudinary.uploader
           .upload(
              path )
           .catch((error) => {
               console.log(error);
           });
        
        //    let id = uploadResult.public_id
        
    
        
        return uploadResult
    } catch (error) {
        next(error)
    }

    // Configuration
   
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url(id, {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    
    // console.log(optimizeUrl);
    // return optimizeUrl
    
    // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    
    // console.log(autoCropUrl);    
};


export default uploadImage