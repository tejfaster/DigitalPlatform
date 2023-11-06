const { jwt } = require("../constant/library")

const genrateToken = (id) => {
    return jwt.sign({id},process.env.jwt_secret,{expiresIn:"1d"})
}

module.exports = {genrateToken}