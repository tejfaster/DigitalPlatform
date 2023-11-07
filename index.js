const { cookie,express, morgan, app, cors } = require("./constant/library")
const dbConnect = require("./config/dbConnect")
const { notfound, errorHandler } = require("./middlewares/errorhandler")
const {authRouter,  productRouter, blogRouter, prodCategoryRouter, blogCategoryRouter  } = require("./routes")

// const authRouter = require("./routes/authRoute")
// const productRouter = require("./routes/productRoute")
// const blogRouter = require("./routes/blogRoute")
// const prodCategoryRouter = require("./routes/productCategoryRoute")

require("dotenv").config()
dbConnect()

app.use(morgan())
app.use(express.json())
app.use(cookie())
app.use(cors())

app.use("/api/user",authRouter) 
app.use("/api/product",productRouter) 
app.use("/api/blog",blogRouter) 
app.use("/api/prodcategory",prodCategoryRouter) 
app.use("/api/blogcategory",blogCategoryRouter) 


app.use(notfound)
app.use(errorHandler)

app.listen(process.env.port,()=> console.log("your server is running at",process.env.port))