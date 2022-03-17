//require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const sauceRoutes = require("./routes/roadSauce");
const userRoutes = require("./routes/roadUser");
const path = require("path");
//app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://bruno_me:11!78380b2@cluster0.2bhrr.mongodb.net/piquante?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
const helmet = require("helmet");
app.use(helmet({ crossOriginResourcePolicy: false }));

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

//app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/images", express.static(path.join(__dirname, "../imagesFolder")));

//Routes
//app.use("/api/sauces", sauceRoutes);
//app.use("/api/auth", userRoutes);

const verif = require("./middleware/verif");
const multer = require("./middleware/multer-config");

const info3 = (req, res, next) => {
  console.log("local infoL : ");
  next();
};

//const router = express.Router();
const truc14 = (req, res, next) => {
  console.log("body_t14  ", req.body);
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("le tokk t14....", token);
  } catch {
    console.log("la LOOOse....");
  }

  //console.log("header ", req.header.Authorization);
  next();
};
const verif_2 = (req, res, next) => {
  console.log("date ", new Date());
  next();
  /* const jwt = require("jsonwebtoken");
  try {
    const token = req.headers.authorization.split(" ")[1];

    console.log("TRUC 2222_______ ", token);
    next();
  } catch {
    console.log("la LOOO....");
  } */
};

const sauceCtrl = require("./controllers/ctrSauce");
/*sauces**/
const pathSauce = "/api/sauces/";
app.get(pathSauce, verif, sauceCtrl.getAllSauce);

//router.get("/api/sauces/", verif, sauceCtrl.infodate, sauceCtrl.getAllSauce);
app.get(pathSauce + ":id", verif, sauceCtrl.getOneSauce); //verif viré
app.post(pathSauce, verif, multer, sauceCtrl.createSauce);

app.put(pathSauce + ":id", verif, multer, sauceCtrl.modifySauce);
app.delete(pathSauce + ":id", verif, sauceCtrl.deleteSauce);
app.post(pathSauce + ":id/like", truc14, verif, sauceCtrl.aimerSauce);

// pour le front html

app.put("/api/saucesTest/:id", verif, sauceCtrl.modifySauceLight);

app.get("/api/saucesBy:id", truc14, verif, sauceCtrl.getAllSauceByUser);

const inLocal = (req, res, next) => {
  /**test  */
  res.locals.date = Date.now();
  res.locals.email = req.body["email"];

  next();
};
const userCtrl = require("./controllers/ctrUser");
const pathUser = "/api/auth/";
app.post(pathUser + "login", userCtrl.testUser, userCtrl.login);
app.post(pathUser + "signup", userCtrl.signup);

//************ */
const truc15 = (req, res, next) => {
  const file = req.file;
  // res.sendFile(__dirname + "/index.html");
  if (!file) {
    console.log("pas_ok");
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  console.log("ok");
  res.send(file);
};

app.post("/api/testPict", truc15);

module.exports = app;
