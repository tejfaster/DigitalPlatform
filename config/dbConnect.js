const { mongoose } = require("../constant/library")

const  dbConnect = () => {
    try{
        mongoose.connect(process.env.mongoDb_Url)
        console.log("Database connect successfully")
    }catch(err){
        throw new Error(err)
    }
}

module.exports = dbConnect