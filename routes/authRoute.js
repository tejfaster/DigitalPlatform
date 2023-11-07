const { express } = require("../constant/library")
const { createUser, loginUser, getAlluser, getUser, deletUser, updateUser, un_BlockUser, handleRefreshtoken, logout, updatePassword, forgotPasswordToken, resetPassword, } = require("../controller/userCtrl")
const { authMiddleware, isAdmin } = require("../middlewares")

const router = express.Router()

router.post('/register',createUser)
router.post('/forgotpassword',forgotPasswordToken)
router.post("/resetPassword/:token",resetPassword)
router.put("/password",authMiddleware,updatePassword)
router.post('/login',loginUser)
router.patch("/update",authMiddleware,updateUser)
router.get("/allusers",getAlluser)
router.get("/refreshtoken",handleRefreshtoken)
router.get("/logout",logout)
router.get("/getuser/:id",authMiddleware,isAdmin,getUser)
router.delete("/deletuser/:id",deletUser)
router.patch("/un_blockuser/:id",authMiddleware,isAdmin,un_BlockUser)


module.exports = router