import express from "express";
import userRouter from "./UserRouter.js";
import blogRouter from "./BlogRouter.js";
import likeRouter from "./like.js";
import commentRouter from "./comment.js";

const router = express.Router();

router.use("/user",userRouter)
router.use('/blog',blogRouter)
router.use('/like',likeRouter)
router.use('/comment',commentRouter)


export default router