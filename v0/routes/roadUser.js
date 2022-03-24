const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/ctrUser");
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/", userCtrl.getAllUser);

module.exports = router;
