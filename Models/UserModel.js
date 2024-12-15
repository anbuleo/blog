import mongoose from "../Comon/dbconnect.js";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    }
})

const User = mongoose.model("User", userSchema);
export default User