import express from "express";
import userController from "../Controllers/userController.js";
import verifyToken from "../Comon/verifyToken.js";


const router = express.Router();

router.post("/signup",userController.createUser);
router.get("/getusers",verifyToken,userController.getUsers);
router.post("/login",userController.loginUser);
router.post("/logout",verifyToken,userController.logout);


export default router