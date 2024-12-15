import Comment from "../Models/LikeComments.js";


const comment = async(req,res,next)=>{
    try {     
        let blogId = req.params.id;
        let comment = new Comment({comments:req.body.comment,blogId:blogId,userId:req.user.id});
        await comment.save();       

        res.status(201).json({
            message:"comment added successfully",
            comment
        })
        
        
    } catch (error) {
        next(error)
    }
}

const deleteComment = async(req,res,next)=>{    
    try {
        let commentId = req.params.id;

        let comment = await Comment.findById(commentId);
        if(!comment)return next({statusCode:404, message:"comment not found"});

        let condition = comment.userId.toString() === req.user.id.toString();
        if(!condition){ 
            return next({statusCode:401, message:"unauthorized"});
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({
            message:"comment deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}

export default  {
    comment,
    deleteComment
}