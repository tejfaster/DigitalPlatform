const { express } = require("../constant/library");
const { createProduct, getProduct, updateProduct, deleteProduct, getAllProduct } = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares");

const router = express.Router()

router.post("/",authMiddleware,isAdmin,createProduct)
router.get("/:id",authMiddleware,isAdmin,getProduct)
router.get("/",getAllProduct)
router.put("/:id",authMiddleware,isAdmin,updateProduct)
router.delete("/:id",authMiddleware,isAdmin,deleteProduct)

module.exports = router