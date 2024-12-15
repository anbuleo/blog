import Like from "../Models/Likes.js";


const getlikes = async (req, res,next) => {
    try {
        
        let likes = await Like.find({blogId: req.params.id}).populate('userId', 'name');
        res.status(200).json({likes})
    } catch (error) {
        next(error)
    }
}     

const addlike = async (req, res,next) => {
    try {
        let { blogId} = req.body
        let like = await Like.findOne({userId:req.user.id, blogId});
        if(like){
            next({statusCode:400, message:"already liked"})
        }   
        like = await Like.create({userId:req.user.id , blogId});  
        like.save()
        res.status(201).json({message:"liked successfully"}) 
        
    } catch (error) {
        next(error)
    }
}


export default  {
    getlikes,
    addlike
}