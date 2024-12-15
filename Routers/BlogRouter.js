import express from "express";

import blogController from "../Controllers/blogcontroller.js";
import verifyToken from "../Comon/verifyToken.js";
import multer from "multer";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url'
import uploadImage from "../Comon/fileupload.js";
import Blog from "../Models/Blog.js";



const router = express.Router();


router.post('/create',verifyToken,blogController.createBlog);
router.put('/edit/:id',verifyToken,blogController.editBlog);
router.delete('/delete/:id',verifyToken,blogController.deleBlog);
router.post('/upload/:id',verifyToken, async(req,res,next)=>{

    try {
        let id = req.params.id
      
        const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
        const uploadDir = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    const chunks = [];
    req.on('data', (chunk) => {
        chunks.push(chunk);
    })
   req.on('end', async() => {
        // Combine all chunks into a buffer
        const buffer = Buffer.concat(chunks);
        
        // Generate file path
        const filePath = path.join(uploadDir, `image_${Date.now()}.png`);
        //   let uploadResult =await uploadImage(filePath,id,next);
        //   console.log(uploadResult);
    
        // Save the buffer to a file
      fs.writeFile(filePath, buffer, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send({ error: 'File upload failed' });
            }
            // console.log('File uploaded successfully:', filePath);
          
          
            // res.status(200).send({ message: 'File uploaded successfully', filePath });
        });
        
        let uploadResult =await uploadImage(filePath);

        let blog = await Blog.findOneAndUpdate({_id:id},{$set:{image:uploadResult.url}},{ new: true, runValidators: true, context: 'query' });   
        if(!blog){
            return next({statusCode:404, message:"blog not found"});
        }
        fs.unlink(filePath, (deleteErr) => {
            if (deleteErr) {
                console.error('Error deleting file:', deleteErr);
                return res.status(500).send({ error: 'Failed to delete file after processing' });
            }

            // res.status(200).send({ message: 'File processed and deleted successfully' });
        })

        res.status(201).json({
            message: "blog updated successfully",
            blog    
        })
       

      

    });
  



// let file= await paths(uploadDirs)
// console.log(file)
// await uploadImage(file);
  

    } catch (error) {
        next(error)
    }
})



export default router