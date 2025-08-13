const router = require("express").Router();

const { registerUser, userLogin } = require("../controllers/authController");

const {
  verifytoken,
  authorizedRoles,
} = require("../middlewares/authMiddleware");

router.post("/sign-up", registerUser);
router.get("/sign-in", userLogin);

module.exports = router;
