const express = require("express");
const router = express.Router();

const estValable = require("../middleware/verifier");

const sauceCtrl = require("../controllers/sauce");

router.get("/", estValable, sauceCtrl.getLesSauces); //problemo
router.get("/:id", estValable, sauceCtrl.getUneSauce);

router.get("/:id", estValable, sauceCtrl.deleteUneSauce);
router.post("/:id/like", estValable, sauceCtrl.noterUneSauce);
/*POST /api/sauces/:id/like { userId: String,
like: Number }
{ message: String } */
//router.post(....

module.exports = router;
