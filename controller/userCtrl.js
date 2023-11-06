const { genrateToken ,refreshToken } = require("../config")
const { asyncHandler, jwt, crypto } = require("../constant/library")
const {User}= require("../models")
const validateMongoDbId = require("../utils/validMongoId")
const sendEmail = require("./emailCtrl")

const createUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req?.body?.email })
    if (user) {
        throw new Error("User already Exists")
    }
    else {
        const newUser = User.create(req?.body)
        res.json(newUser)
    }
})

const loginUser = asyncHandler(async (req, res) => {
    // check if user is exist or not
    const user = await User.findOne({ email: req?.body?.email })
    if (user && await user.isPasswordMatch(req?.body?.password)) {
        const token = refreshToken(user?._id)
        const addtoken = await User.findByIdAndUpdate(user?._id, {
            refreshToken: token
        }, {
            new: true
        })
        res.cookie("refreshtoken", token, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })
        res.json({
            id: user?._id,
            email: user?.email,
            firstname: user?.firstname,
            lastname: user?.lastname,
            mobile: user?.mobile,
            token: genrateToken(user?._id)
        })
    } else {
        throw new Error("Invalid Credentials")
    }
})

// handle refresh token
const handleRefreshtoken = asyncHandler(async (req, res) => {
    const cookie = req?.cookies
    if (!cookie?.refreshtoken) throw new Error("No Refresh Token in Cookies")
    const token = cookie?.refreshtoken
    const user = await User.findOne({ refreshToken: token })
    if (!user) throw new Error("No refresh token present in db or not matched")
    jwt.verify(token, process.env.jwt_secret, (err, decoded) => {
        if (err || user?.id !== decoded.id) {
            throw new Error("there is somrthing wrong with refreshtoken")
        }
        const newToken = genrateToken(user?._id)
        res.json(newToken)
    })
})

// update User
const updateUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req?.user?._id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        }, {
            new: true
        })
        res.json(user)
    } catch (err) {
        throw new Error(err)
    }
})

// logout 
const logout = asyncHandler(async (req, res) => {
const token = req?.cookies?.refreshtoken
    if (!token) throw new Error("No refresh token in cookies")
    const user = await User.findOne({ "refreshToken": token })
    if (!user) {
        res.clearCookie("refreshtoken", {
            httpOnly: true,
            secure: true
        })
        return res.sendStatus(204)
    }
    await User.findOneAndUpdate({ "refreshToken": token }, {
        refreshToken: ""
    })
    res.clearCookie("refreshtoken", {
        httpOnly: true,
        secure: true
    })
    return res.sendStatus(204)
})

// Get all user 
const getAlluser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers)
    } catch (err) {
        throw new Error(err)
    }
})

// get a User
const getUser = asyncHandler(async (req, res) => {
    validateMongoDbId(req?.params?.id)
    try {
        const user = await User.findById(req?.params?.id)
        res.json(user)
    } catch (err) {
        throw new Error(err)
    }
})

// remove a user
const deletUser = asyncHandler(async (req, res) => {
    validateMongoDbId(req?.params?.id)
    try {
        const user = await User.findByIdAndRemove(req?.params?.id)
        res.json({
            deleteUser: user
        })
    } catch (err) {
        throw new Error(err)
    }
})

// block n unblock User
const un_BlockUser = asyncHandler(async (req, res) => {
    validateMongoDbId(req?.params?.id)
    try {
        const user = await User.findByIdAndUpdate(req?.params?.id, {
            isBlocked: req?.body?.isBlocked
        }, {
            new: true
        })
        res.json(user)
    } catch (err) {
        throw new Error(err)
    }
})

const updatePassword = asyncHandler(async(req,res)=>{
    const {_id} = req.user
    const password = req.body.password
    validateMongoDbId(_id)
    const user = await User.findById(_id)
    if(password){
        user.password = password       
        const updatedPassword = await user.save()
        res.json(updatedPassword)
    }else{
        res.json(user)
    }
})

// forgotPassword
const forgotPasswordToken = asyncHandler(async(req,res)=>{
    const user = await User.findOne({email:req?.body?.email})
    if(!user) throw new Error("User not found with this email")
    try{
        const token = await user.createPasswordResetToken()
        await user.save()
        const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now.<a href='http://localhost:8080/api/user/resetPassword/${token}'>Click me</a>`
        const data ={
            to:req.body.email,
            text:"Hey User",
            subject:"Forgot password Link",
            htm:resetURL
        }
        sendEmail(data)
        res.json(token)
    }catch(err){
        throw new Error(err)
    }
})

// resetPassword
const resetPassword = asyncHandler(async(req,res)=>{
    const hashedToken = crypto.createHash('sha256').update(req?.params?.token).digest("hex")
    const user = await User.findOne({
        passwordResetToken:hashedToken,
        passwordResetExpires:{$gt:Date.now()}
    })
    if(!user) throw new Error("Token Expired, Please try again later")
    user.password = req.body.password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    res.json(user)
})

module.exports = {
    createUser,
    loginUser,
    updateUser,
    getAlluser,
    getUser,
    deletUser,
    un_BlockUser,
    handleRefreshtoken,
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword
}