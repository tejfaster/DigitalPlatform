const { express } = require("../constant/library");
const { createProdCategory, getProdCategory, getAllProdCategory, updateProdCategory, deleteProdCategory } = require("../controller/prodCategoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares");

const router = express.Router()

router.post("/",authMiddleware,isAdmin,createProdCategory)
router.get("/:id",authMiddleware,isAdmin,getProdCategory)
router.get("/",authMiddleware,getAllProdCategory)
router.put("/:id",authMiddleware,isAdmin,updateProdCategory)
router.delete("/:id",authMiddleware,isAdmin,deleteProdCategory)

module.exports = router