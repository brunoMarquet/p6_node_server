//require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const path = require("path");
//app.use(cookieParser());

const helmet = require("helmet");

mongoose
  .connect(
    "mongodb+srv://bruno_me:11!78380b2@cluster0.2bhrr.mongodb.net/piquante?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
/* const sauceRoutes = require("./routes/road");
const userRoutes = require("./routes/road"); */

////varias
const router = express.Router();

const verif = require("./middleware/verif");
const multer = require("./middleware/multer-config");

const sauceCtrl = require("./controllers/ctrSauce");
/*sauces**/
const pathSauce = "/api/sauces/";
app.get(pathSauce, verif, sauceCtrl.infodate, sauceCtrl.getAllSauce);
//router.get("/api/sauces/", verif, sauceCtrl.infodate, sauceCtrl.getAllSauce);
app.get(pathSauce + ":id", verif, sauceCtrl.getOneSauce);
app.post(pathSauce, verif, multer, sauceCtrl.createSauce);

app.put(pathSauce + ":id", verif, multer, sauceCtrl.modifySauce);
app.delete(pathSauce + ":id", verif, sauceCtrl.deleteSauce);
app.post(pathSauce + ":id/like", verif, sauceCtrl.aimer);

/*User**/
const inLocal = (req, res, next) => {
  const psw = req.body["password"];
  const mail = req.body["email"];
  console.log(" coucou testUser2  ", psw, mail);
  res.locals.date = Date.now();
  res.locals.psw = psw;
  res.locals.email = mail;
  //  , mail;
  // "titi_" + Math.floor(Math.random() * 40) + 18;
  //res.locals.testToken = "titi" + Math.floor(Math.random() * 40) + 18;
  next();
};
const userCtrl = require("./controllers/ctrUser");
const pathUser = "/api/auth/";
app.post(pathUser + "login", inLocal, userCtrl.login);
app.post(pathUser + "signup", inLocal, userCtrl.signup);
//userCtrl.testUser,
//router.post("/", userCtrl.getAllUser);

//app.use("/api/sauces", sauceRoutes);
//app.use("/api/auth", userRoutes);

module.exports = app;
