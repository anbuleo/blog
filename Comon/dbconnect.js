import mongoose from "mongoose";
import env from 'dotenv'

env.config()
let uri = process.env.URL;
let name = process.env.NAME;


try {
    mongoose.connect(`${uri}/${name}`)
    console.log("connected to database");
} catch (error) {
    console.log(error)
}


export default mongoose;