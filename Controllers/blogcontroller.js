import Blog from "../Models/Blog.js";
import imageUpload from "../Comon/fileupload.js";
import multer from "multer";


const createBlog = async (req, res,next) => {
    try {
        let { title, description } = req.body;
        // console.log(req.user.id); 

        // image = await imageUpload(image);

        const blog = new Blog({
            title,
            description,
           
            userId: req.user.id        
        });
        // console.log(blog)

        await blog.save();
        res.status(201).json({        
            message: "blog created successfully",
            blog
        });
    } catch (error) {    
        next(error);
    }
}  


const editBlog = async (req, res,next) => {
    try {
        let updateData = req.body;

        let blogId = req.params.id;
       
        const updateFields = {};
        if (updateData.title) updateFields.title = updateData.title;
        if (updateData.description) updateFields.description = updateData.description;

        
        let blog = await Blog.findOneAndUpdate({_id:blogId},{$set:updateFields},{ new: true, runValidators: true, context: 'query' });
        if(!blog){
            return next({statusCode:404, message:"blog not found"});
        }
       



        res.status(201).json({
            message: "blog updated successfully",
            blog    
        })
        // console.log(req.user.id); 

        // image = await imageUpload(image);
    }catch(error){
        next(error) 
    }  
}


const deleBlog = async(req,res,next)=>{
    try {
        let blogId = req.params.id;
        let blog = await Blog.findById({_id:blogId});
        if(!blog)return next({statusCode:404, message:"blog not found"});

        let condition = blog.userId.toString() === req.user.id.toString();
        if(!condition){ 
            return next({statusCode:401, message:"unauthorized"});
        } 
        console.log(req.user)   
        await Blog.findByIdAndDelete(blogId);
        res.status(201).json({
            message: "blog deleted successfully"
                
        })

    } catch (error) {
        next(error)
    }
}





export default {
    createBlog,
    editBlog,
    deleBlog
}