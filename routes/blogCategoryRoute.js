const { express } = require("../constant/library");
const { createBlogCategory, getBlogCategory, getAllBlogCategory, updateBlogCategory, deleteBlogCategory } = require("../controller/blogCategoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares");

const router = express.Router()

router.post("/",authMiddleware,isAdmin,createBlogCategory)
router.get("/:id",authMiddleware,isAdmin,getBlogCategory)
router.get("/",authMiddleware,getAllBlogCategory)
router.put("/:id",authMiddleware,isAdmin,updateBlogCategory)
router.delete("/:id",authMiddleware,isAdmin,deleteBlogCategory)

module.exports = router