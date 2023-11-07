// not found
const notfound = (req,res,next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`)
    res.status(404)
    next(error)
}

// Error Handler
const errorHandler = (err,req,res,next) =>{
    const statuscode = res.statusCode == 200 ? 500 : res.statuscode
    console.log(statuscode,res.statusCode)
    res.status(statuscode)
    res.json({message: err?.message,stack:err?.stack})
}


// no data found
const noDataFound = (data) => {if(!data) throw new Error("no data found") }   


module.exports = {notfound,errorHandler,noDataFound} 