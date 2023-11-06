const { authMiddleware, isAdmin } = require("./authMiddleware")
const { notfound, errorHandler } = require("./errorhandler")


module.exports = {
    authMiddleware,  
    isAdmin,
    notfound,
    errorHandler,
}