const { asyncHandler } = require("../constant/library")
const {  } = require("../middlewares")
const { noDataFound } = require("../middlewares/errorhandler")
const { BlogCategory } = require("../models")
const validateMongoDbId = require("../utils/validMongoId")

const createBlogCategory = asyncHandler(async (req, res) => {
    try {
        const blogCategory = await BlogCategory.create(req?.body)
        res.json(blogCategory)
    } catch (err) {
        throw new Error(err)
    }
})
const getBlogCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req?.params
        validateMongoDbId(id)
        const blogCategory = await BlogCategory.findById(id)
        noDataFound(blogCategory)
        res.json(blogCategory)
    } catch (err) {
        throw new Error(err)
    }
})
const getAllBlogCategory = asyncHandler(async (req, res) => {
    try {
        const blogCategory = await BlogCategory.find()
        noDataFound(blogCategory)
        res.json(blogCategory)
    } catch (err) {
        throw new Error(err)
    }
})
const updateBlogCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req?.params
        validateMongoDbId(id)
        const blogCategory = await BlogCategory.findByIdAndUpdate(id,req.body,{new:true})
        noDataFound(blogCategory)
        res.json(blogCategory)
        } catch (err) {
        throw new Error(err)
    }
})
const deleteBlogCategory = asyncHandler(async (req, res) => {
    try{
    const {id} = req?.params
    validateMongoDbId(id)
    const blogCategory = await BlogCategory.findByIdAndDelete(id)
    noDataFound(blogCategory)
    res.json(blogCategory)
    }catch(err){
        throw new Error(err)
    }
})

module.exports = {
    createBlogCategory,
    getBlogCategory,
    getAllBlogCategory,
    updateBlogCategory,
    deleteBlogCategory
}