const { ObjectId } = require("../constant/library")

const validateMongoDbId = (id)=>{
    const isValid = ObjectId.isValid(id)
    if(!isValid)  throw new Error("Id isn't valid or not Found")
}

module.exports = validateMongoDbId