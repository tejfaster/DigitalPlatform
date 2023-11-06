const { asyncHandler, slugify } = require("../constant/library")
const {Product} = require("../models")
const validateMongoDbId = require("../utils/validMongoId")

const createProduct = asyncHandler(async(req,res)=>{
    try{
        if(req?.body?.title){
            req.body.slug = slugify(req.body.title)
        }
        const product = await Product.create(req.body)
        res.json(product)
    }catch(err){
        throw new Error(err)
    }
})
const getProduct = asyncHandler(async(req,res)=>{
    try{
        validateMongoDbId(req?.params?.id)
        const product =  await Product.findById(req?.params?.id)
        if(!product) throw new Error("product not aviable")
        res.json(product)
    }catch(err){
        throw new Error(err)
    }
    
})
const getAllProduct = asyncHandler(async(req,res)=>{
    try{
        
        // Flitering
        const queryObj = {...req.query}
        const excludeFields = ["page","sort","limit","fields"]
        excludeFields.forEach((el) => delete queryObj[el])
        // console.log(queryObj)
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match =>`$${match}`);
        // console.log(JSON.parse(queryStr))
        let query = Product.find(JSON.parse(queryStr))

        // Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ")
            query = query.sort(sortBy)
        }else{
            query = query.sort('-createdAt')
        }

        //limiting  thge fields
        if(req.query.fields){
            const fields = req.query.fields.split(",").join(" ")
            query = query.select(fields)
        }else{
            query = query.select('-__v')
        }

        // pagination
        const page = req.query.page
        const limit = req.query.limit
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)
        if(req.query.page){
            const productCount = await Product.countDocuments()
            if(skip >= productCount ) throw new Error("This Page does not Exists")
        }
        console.log(page,limit,skip)

        const products = await query
        // const products = await Product.where("category").equals(
        //     req.query.category
        // )
        res.json(products)
    }catch(err){
        throw new Error(err)
    }
})
const updateProduct = asyncHandler(async(req,res)=>{
    try{
        validateMongoDbId(req?.params?.id)
        if(req?.body?.title){
            req.body.slug = slugify(req.body.title)
        }
        const product = await Product.findOneAndUpdate({"_id":req.params.id},req.body,{new:true})
        res.json(product)
    }catch(err){
        throw new Error(err)
    }
})
const deleteProduct = asyncHandler(async(req,res)=>{
    try{
        validateMongoDbId(req?.params?.id)
        const product = await Product.findByIdAndDelete(req.params.id)
        res.json(product)
    }catch(err){
        throw new Error(err)
    }
})


module.exports = {
    createProduct,
    updateProduct,
    getProduct,
    deleteProduct,
    getAllProduct
}