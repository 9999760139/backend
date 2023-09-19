const express = require("express");
const { userRegister, userCurrent, userLogin } = require("../controllers/userController");
const validateHandler = require("../middleware/validatTokenHandler");

const router = express.Router();



router.post("/register", userRegister)
router.post("/login", userLogin)

router.get("/current", validateHandler, userCurrent)

module.exports = router;