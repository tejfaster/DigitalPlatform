const { asyncHandler } = require("../constant/library")
const {Blog, User} = require("../models")
const validateMongoDbId = require("../utils/validMongoId")

const createBlog = asyncHandler(async(req,res)=>{
    try{
        validateMongoDbId(req.user.id)
        const blog = await Blog.create(req.body)
        res.json({
            status:"success",
            blog
        })
    }catch(err){
        throw new Error(err)
    }
})
const getBlog = asyncHandler(async(req,res)=>{
    try{
        const {id} = req?.params       
        validateMongoDbId(id)
        const blog = await Blog.findById(id)
        if(!blog) throw new Error("no data found")
        await Blog.findByIdAndUpdate(id,{
            $inc:{numViews:1}
        },{
            new:true
        }) 
        res.json(blog)
    }catch(err){
        throw new Error(err)
    }
})
const updateBlog = asyncHandler(async(req,res)=>{
    try{
        validateMongoDbId(req?.params?.id)
        const blog = await Blog.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(blog)
    }catch(err){
        throw new Error(err)
    }
})
const deleteBlog = asyncHandler(async(req,res)=>{
    try{
        validateMongoDbId(req?.params?.id)
        const blog = await Blog.findByIdAndDelete(req.params.id)
        res.json(blog)
    }catch(err){
        throw new Error(err)
    }
})


const getAllBlog = asyncHandler(async(req,res) => {
    try{
        const blog = await  Blog.find()
        res.json(blog)
    }catch(err){
        throw new Error(err)
    }
})
module.exports = {
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog,
    getAllBlog
}