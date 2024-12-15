import mongoose from "../Comon/dbconnect.js";

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    comments : {
        type:String,
        required:true   
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Comment = mongoose.model("Comment", CommentSchema);   

export default Comment
