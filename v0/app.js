//require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const sauceRoutes = require("./routes/roadSauce");
const userRoutes = require("./routes/roadUser");
const path = require("path");
const folderPict = "../imagesFolder"; // "imagesFolder";
//imagesFolder
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
app.use("/images", express.static(path.join(__dirname, folderPict)));

app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
