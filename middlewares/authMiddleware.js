const { jwt,asyncHandler } = require('../constant/library')
const User = require('../models/userModel')

const authMiddleware = asyncHandler(async(req,res,next) => {
    let token
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
        try{
            if(token){
                const decoded = jwt.verify(token,process.env.jwt_secret)
                const user = await User.findById(decoded?.id)
                req.user = user
                next()
            }
        }catch(err){
            throw new Error("Not Authorized token is expired, Please login again")
        }
    }else{
        throw new Error("There is no Token attached to headers")
    }
})

const isAdmin = asyncHandler(async(req,res,next)=>{
    const user = await User.findOne({email:req?.user?.email})
    if(user.role !== "admin"){
        throw new Error("You aren't an admin")
    }else{
        next()
    }  
})

module.exports = {authMiddleware,isAdmin}