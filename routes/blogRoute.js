const { router } = require("../constant/library");
const { createBlog, getBlog, updateBlog, deleteBlog, getAllBlog } = require("../controller/blogCtrl");
const { authMiddleware } = require("../middlewares");

router.post("/",authMiddleware,createBlog)
router.get("/:id",getBlog)
router.put("/:id",updateBlog)
router.get("/",getAllBlog)
router.delete("/:id",deleteBlog)

module.exports = router