const jwt = require('jsonwebtoken')
const verifyToken = (req,res,next) =>{
    try{
       

        const token = req.cookies.token;

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token missing."
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({
                success:false,
                message:"Unauthorized."
            })
        }
        req.id = decoded.id
        next()

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = verifyToken