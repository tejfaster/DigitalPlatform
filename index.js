const { cookie,express, morgan } = require("./constant/library")
const dbConnect = require("./config/dbConnect")
const { notfound, errorHandler } = require("./middlewares/errorhandler")
const { authRouter, productRouter, blogRouter } = require("./routes")

require("dotenv").config()
dbConnect()

const app = express()
const port = process.env.port

app.use(morgan())
app.use(express.json())
app.use(cookie())

app.use("/api/user",authRouter) 
app.use("/api/product",productRouter) 
app.use("/api/blog",blogRouter) 

app.use(notfound)
app.use(errorHandler)

app.listen(port,()=> console.log("your server is running at",port))