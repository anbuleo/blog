import express from 'express'
import commentController from '../Controllers/commentController.js'
import verifyToken from '../Comon/verifyToken.js'


const router = express.Router();

router.post('/addcomment/:id',verifyToken,commentController.comment);
router.delete('/delete/:id',verifyToken,commentController.deleteComment);


export default router