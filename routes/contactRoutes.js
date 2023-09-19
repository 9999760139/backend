const express = require("express");
const { getContact, createContact, updateContact, deleteContact, getOneContact } = require("../controllers/contactController")

const router = express.Router();
const validateToken = require("../middleware/validatTokenHandler");

router.use(validateToken);

router.route("/").get(getContact)
router.route("/:id").get(getOneContact)
router.route("/").post(createContact)
router.route("/:id").put(updateContact)
router.route("/:id").delete(deleteContact)

module.exports = router