import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const createUser = async (req, res,next) => {
    try {
        let { name, email, password } = req.body;

        let userExist = await User.findOne({ email: email });
        if (userExist) {
            return next({ status: 409, message: "user already exist" });
        }
        
        let newPassword = await bcrypt.hash(password, 10);


        
        
        
        const user = new User({
            name,
            email,
            password: newPassword,
        });

       


        await user.save();
        res.status(201).json({
            message: "user created successfully",});
    } catch (error) {
        next(error);
    }
}

const getUserRole = async(id)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}

const getUsers = async (req, res,next) => {
    try {

        const users = await User.find();

        if(req.user.role !== "admin"){            
            return next({status: 401, message: "unauthorized"});
        }
       
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}
const loginUser = async (req, res,next) => {
    try {
        let {email,password} = req.body;
        const user = await User.findOne({email: req.body.email});



        if(!user){
            return next({status: 404, message: "user not found"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return next({status: 401, message: "invalid password"});
        }   

        let token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});



        res.status(200).json({
            message: "login successful",
            token
        });
    } catch (error) {
        next(error);
    }
}
let logout = async(req,res,next)=>{
    try {
        
    
        res.status(200).json({
            message:"logout successful"
        })
    } catch (error) {
        next(error)
    }
}





export default {
    createUser,
    getUsers,
    loginUser,
    logout

}