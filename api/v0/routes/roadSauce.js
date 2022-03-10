const express = require("express");
const router = express.Router();

const verif = require("../middleware/verif");
const multer = require("../middleware/multer-config");

const sauceCtrl = require("../controllers/ctrSauce");

router.get("/", verif, sauceCtrl.infodate, sauceCtrl.getAllSauce);
router.get("/:id", verif, sauceCtrl.getOneSauce);
router.post("/", verif, multer, sauceCtrl.createSauce);
//router.post("/", verif, sauceCtrl.createSauceTest);
router.put("/:id", verif, multer, sauceCtrl.modifySauce);
router.delete("/:id", verif, sauceCtrl.deleteSauce);
router.post("/:id/like", verif, sauceCtrl.aimerSauce);

module.exports = router;
