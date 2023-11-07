const {  express } = require("../constant/library");
const { createBlog, getBlog, updateBlog, deleteBlog, getAllBlog, likeBlog, dislikeblog } = require("../controller/blogCtrl");
const { authMiddleware } = require("../middlewares");

const router = express.Router()
router.post("/",authMiddleware,createBlog)
router.get("/:id",getBlog)
router.put("/:id",updateBlog)
router.get("/",getAllBlog)
router.get("/islike/:id",authMiddleware,likeBlog)
router.get("/isdislike/:id",authMiddleware,dislikeblog)
router.delete("/:id",deleteBlog)

module.exports = router