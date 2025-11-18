const express = require("express");
const router = express.Router();
const {
  getContact,
  CreateContact,
  getParticularContact,
  UpdateContact,
  DeleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/vlaidateTokenHandler");
router.use(validateToken);
router.route("/").get(getContact).post(CreateContact);
router
  .route("/:id")
  .get(getParticularContact)
  .put(UpdateContact)
  .delete(DeleteContact);

module.exports = router;
