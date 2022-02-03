const express = require("express");
const router = express.Router();

//const limiter = require('../middleware/limiter');

const userCtrl = require("../controllers/ctrUser");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
