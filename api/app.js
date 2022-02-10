//require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const sauceRoutes = require("./routes/roadSauce");
const userRoutes = require("./routes/roadUser");
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
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

////varia
const jwt = require("jsonwebtoken");

app.get("/api/pipo/t1", (req, res, next) => {
  res.locals.info = "coucou";
  res.status(200).json({ message: new Date() });
});
app.get("/api/pipo/t2", (req, res, next) => {
  res.locals.info = "coucou";

  // res.send(token);
  // res.status(200).json({ leToken: token });
  res.status(200).json({
    id: "Laure" + Math.floor(Math.random() * 200) + 1,
    heure: new Date(),
    token: jwt.sign({ message: `le ${new Date()}` }, "8956755_wz", {
      expiresIn: "24h",
    }),
  });
});
app.get("/api/pipo/t3", (req, res, next) => {
  res.locals.info = "coucou";
  let token = jwt.sign({ username: "ado", age: 15 }, "supersecret", {
    expiresIn: "24h",
  });
  //console.log("debug55");
  // res.send(token);
  // res.status(200).json({ leToken: token });
  const truc = {
    id: "Laurent" + Math.floor(Math.random() * 200) + 1,
    heure: new Date(),
    token: jwt.sign({ message: `le ${new Date()}` }, "8956755_wz", {
      expiresIn: "24h",
    }),
  };
  console.log("truc");
  res.locals.truc = truc;
  goFonction(res);
  res.status(200).json({ message: "Rien" });
});
function goFonction(res) {
  console.log("_________res.locals.truc_______");
  console.log(res.locals.truc);
}

module.exports = app;
