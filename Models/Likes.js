import mongoose from "../Comon/dbconnect.js";


const likesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Like = mongoose.model("Like", likesSchema);
export default Like