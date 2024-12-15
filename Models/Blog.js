import mongoose from "../Comon/dbconnect.js";



const blogSchema = new mongoose.Schema({
     userId:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
     },
     title: {
          type: String,
          required: true
     },
     description: {
          type: String,
          required: true    
     },
     image: {
          type: String,
          default:""
          
     },
     createdAt: {
          type: Date,
          default: Date.now
     }
})


const Blog = mongoose.model("Blog", blogSchema);
export default Blog