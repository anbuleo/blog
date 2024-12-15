import express from "express";
import likeController from "../Controllers/likesController.js";
import verifyToken from "../Comon/verifyToken.js";



const router = express.Router();

router.post('/addlike',verifyToken,likeController.addlike);
router.get('/getlikes/:id',verifyToken, likeController.getlikes);

export default router