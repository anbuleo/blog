import express from "express";
import cors from "cors";
import env from 'dotenv';
import bodyParser from "body-parser";
import router from './Routers/index.js'


const app = express();
env.config();



app.use(bodyParser.json());
app.use(cors());

app.use("/api",router)

app.use((err,req,res,next)=>{
   let statusCode = err.statusCode || 500;
   let message = err.message || "something went wrong";
   res.status(statusCode).json({message});
})
let port = process.env.PORT || 3000;        
app.listen(port, () => {
    console.log("server is running on port " + port);
});