import jwt from 'jsonwebtoken';


const verifyToken = (req, res, next) => {
            let token = req.headers.authorization?.split(" ")[1];
            // console.log(token);
            if (!token) return next({statusCode:401, message:"token not found"});

            jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
                if(err) return next({statusCode:401, message:"invalid token"});
                req.user = user;
                next();
            })
}


export default verifyToken