const { Router } = require("express");

const router = Router();
// Config Routes//

// Users Routes
router.get("/users", require("../controllers/config/users_controller").getUsers);
router.post("/users", require("../controllers/config/users_controller").createUser);
router.put("/users/:id", require("../controllers/config/users_controller").updateUser);
//end Users Routes

// Categories Routes
router.get("/categories", require("../controllers/config/category_controller").getCategories);
router.post("/categories", require("../controllers/config/category_controller").categoryCreate);
router.put("/categories/:id", require("../controllers/config/category_controller").categoryUpdate);
//end Categories Routes

// Products Routes
router.get("/products", require("../controllers/config/products_controller").getProducts);
router.get("/products/search", require("../controllers/config/products_controller").getProductsBySearch);
router.get("/products/:key_id", require("../controllers/config/products_controller").getProductsById);
router.post("/products", require("../controllers/config/products_controller").createProduct);
router.put("/products/:key_id", require("../controllers/config/products_controller").updateProduct)
//end Products Routes

// Orders Routes
router.get("/orders", require("../controllers/orders_controller").getOrders);
router.get("/orders/search", require("../controllers/orders_controller").getOrdersBySearch);
//router.get("/orders/search", require("../controllers/orders_controller").getOrdersBySearch);
//end Orders Routes

module.exports = router;