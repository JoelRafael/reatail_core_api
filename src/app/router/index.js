const { Router } = require("express");

const router = Router();
// Config Routes//

// Users Routes
router.get("/users", require("../controllers/config/users_controller").getUsers);
router.post("/users", require("../controllers/config/users_controller").createUser);
router.put("/users/:id", require("../controllers/config/users_controller").updateUser);
//end Users Routes


router.get("/categories", require("../controllers/config/category_controller").getCategories);
router.post("/categories", require("../controllers/config/category_controller").categoryCreate);
//router.get("/products", require("../controllers/config/products_controller").getProducts);
module.exports = router;