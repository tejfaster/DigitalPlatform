const { jwt } = require("../constant/library")

const refreshToken = (id) => {
    return jwt.sign({id},process.env.jwt_secret,{expiresIn:"3d"})
}

module.exports = {refreshToken}