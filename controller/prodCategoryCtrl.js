const { asyncHandler } = require("../constant/library");
const { ProdCategory } = require("../models");
const validateMongoDbId = require("../utils/validMongoId");

const createProdCategory = asyncHandler(async(req,res)=>{
    try{
        const prodCategory = await ProdCategory.create(req?.body)
        res.json(prodCategory)
    }catch(err){
        throw new Error(err)
    }
})
const getProdCategory = asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params
        validateMongoDbId(id)
        const prodcategory = await ProdCategory.findById(id)
        noDataFound(prodCategory)
        res.json(prodcategory)        
    }catch(err){
        throw new Error(err)
    }
})

const getAllProdCategory = asyncHandler(async(req,res)=>{
    try{
     const prodCategory = await ProdCategory.find()
     res.json(prodCategory)
    }catch(err){
        throw new Error(err)
    }
})
const updateProdCategory = asyncHandler(async(req,res)=>{
    try{
        const {id} = req?.params
        validateMongoDbId(id)
        const prodCategory = await ProdCategory.findByIdAndUpdate(id,req.body,{new:true})
        noDataFound(prodCategory)
        res.json(prodCategory)
    }catch(err){
        throw new Error(err)
    }
})
const deleteProdCategory = asyncHandler(async(req,res)=>{
    try{
        const {id} = req?.params
        validateMongoDbId(id)
        const prodCategory = await ProdCategory.findByIdAndDelete(id)
        noDataFound(prodCategory)
        res.json(prodCategory)
    }catch(err){
        throw new Error(err)
    }
})


module.exports = {
    createProdCategory,
    getProdCategory,
    getAllProdCategory,
    updateProdCategory,
    deleteProdCategory
}