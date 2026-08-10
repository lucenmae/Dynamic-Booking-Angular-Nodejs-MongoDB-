const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

router.post("/signup", controller.signUp);
router.post("/signin", controller.signIn);

module.exports = router;
