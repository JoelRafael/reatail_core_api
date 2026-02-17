const { Router } = require("express");

const router = Router();

router.get("/users", require("../controllers/config/users_controller").getUsers);
router.post("/users", require("../controllers/config/users_controller").createUser);

module.exports = router;