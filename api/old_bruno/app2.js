const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userController = require("./controllers/user");

const reglemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");
const helmet = require("helmet");

const xss = require("xss"); // a use
// Create a schema
let schema = new passwordValidator();

schema
  .is()
  .min(3) // Minimum length 3
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["000", "123"]); // Blacklist these values

/*
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:
    ${process.env.MONGO_PASSWORD}@cluster0.wp2du.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    */

mongoose
  .connect(
    "mongodb+srv://bruno_me:11!78380b2@cluster0.2bhrr.mongodb.net/piquante?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const Sauce = require("./models/sauce");
const app = express();
/* 

app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
}); */

app.use(bodyParser.json()); // inutile ??
app.use(express.json()); // !!

//app.use(helmet()); //securite

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

function infoReq(req) {
  console.log("________REQ____");
  console.log(req.protocol);
  console.log(req.path);
  console.log(req.method);
  //console.log(req.body.toString());
  for (let key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      console.log("body: " + key + " _ " + req.body[key]);
    }
  }
  for (let key in req.headers) {
    if (req.headers.hasOwnProperty(key)) {
      console.log("header: " + key + " _ " + req.headers[key]);
    }
  }
  console.log(req.header);
  console.log("___________________");
  console.log(req.headers);
  // console.log(req.headers.authorization);
}
//app.get("/api/test2", (req, res, next) => {});

app.get("/api/test3", function (req, res) {
  var token = req.query.token;
});

app.get("/api/test2", function (req, res) {
  infoReq(req);
  var token = jwt.sign({ username: "ado" }, "supersecret", {
    expiresIn: "24h",
  });
  // res.send(token);
  res.status(200).json(token);
});

app.post("/api/test1", (req, res, next) => {
  let erreur = 0;
  let leMessage = "";
  infoReq(req);

  if (verifReq(req)) {
    const psw = req.body["password"];
    const mail = req.body["email"];
    if (schema.validate(psw)) {
      if (estValide(mail, reglemail)) {
        //console.log(recordUser(mail, psw));
        res.status(200).json({
          test: "password ok : " + psw,
          id: mail,
          heure: new Date(),
          token: jwt.sign({ userId: mail }, "8956755_wz", {
            expiresIn: "24h",
          }),
        });
      } else {
        erreur++;
        leMessage += "mail non valide";
      }
    } else {
      erreur++;
      leMessage += "mot de passe non valide";
    }
  }
  if (erreur != 0) {
    res.status(200).json({ test: leMessage });
  }
});

/* app.post("api/auths", (req, res, next) => {
  res.status(200).json({ test: "coucou" });
}); */

//http://localhost:3000/api/sauces
app.get("/api/sauces", (req, res, next) => {
  //idUser: leUserId, token:
  // const token = req.headers.authorization; //.split(" ")[1];
  //const token = req.headers["authorization"];
  // console.log(new Date() + "__" + token);
  const leToken = req.headers.authorization.split(" ")[1];
  console.log("le_tok " + leToken);
  const decodedToken = jwt.verify(leToken, "8956755_wz");
  const userId = decodedToken.userId;

  //const userId = decodedToken.userId;
  console.log("user_   " + userId);
  // const decodedToken = jwt.verify(leToken, "8956755_wz");
  console.log("body0 " + req.body);
  for (let key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      console.log(key + " _ " + req.body[key]);
    }
  }

  console.log("body1--- " + req.body["userId"]);
  console.log("body2--- " + req.body.userId);
  const laVerif = true; //verifToken(theId, leToken);
  if (laVerif) {
    Sauce.find()
      .then((sauces) => {
        res.status(200).json(sauces);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  } else {
    res.status(500).json({ test: "P... la Loose" });
  }

  // res.status(200).json({ test: "_YES _all" });
});

app.post("/api/saucesTest", (req, res, next) => {
  //idUser: leUserId, token:
  const theId = req.body["idUser"];
  const leToken = req.body["token"];
  console.log("api/sauces____" + theId);
  //console.log("api/sauces  _tok___" + leToken);
  const laVerif = verifToken(theId, leToken);
  if (laVerif) {
    Sauce.find()
      .then((sauces) => {
        res.status(200).json(sauces);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });

    // res.status(200).json({ test: "_YES _all" });
  } else {
    res.status(500).json({ test: "P... la Loose" });
  }
});

function verifToken(theId, token) {
  // try {
  //const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "8956755_wz");
  const userId = decodedToken.userId;
  // averifier....
  if (theId === userId) {
    console.log("api/sauces  _tokEEE___");
    return true;
  } else {
    console.log("api/sauces  _BAd___");
    return false;
  }
}

app.post("/api/auth/testPwd", (req, res, next) => {
  const psw = req.body["test"];

  if (schema.validate(psw)) {
    // console.log("ok" + req.body["test"]);
    res.status(200).json({ testGod: psw });
  } else {
    // console.log("faux   " + req.body["test"]);
    res.status(200).json({ testBad: psw });
  }
});

app.use("/api/auth/verif", (req, res, next) => {
  console.log(req["token"]);
});

app.post("/api/auth/login", (req, res, next) => {
  //console.log("test599");
  // (res) => res.json(); // inutile ?
  if (verifReq(req)) {
    const psw = req.body["password"];
    const mail = req.body["email"];
    const User = require("./models/user");
    console.log("test__" + mail);
    // res.status(200).json({ un: 1 });
    //res.status(200).json({ test: mail + " , pwd : " + psw });
    User.findOne({ email: mail })
      .then((user) => {
        if (!user) {
          console.log("non trouv");
          return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt
          .compare(psw, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !" });
            }
            res.header("heelo", "tata"); //??
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, "8956755_wz", {
                expiresIn: "24h",
              }),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    //  res.status(500).json({ error: "req quete non valde" });
  }
});

function estValide(value, regle) {
  return regle.test(value);
}

function verifReq(req) {
  // console.log(schema.validate("jok e", { details: true }));
  if (req.body["password"] && req.body["email"]) {
    return true;
  }
}
function recordUser(mail, pws) {
  let lemess = "";
  bcrypt.hash(pws, 10).then((hash) => {
    console.log(hash);
    const User = require("./models/user");
    const user = new User({
      // const unUser = {
      email: mail,
      password: hash,
    });
    user
      .save()
      .then((lemess = "user enregistré"))
      .catch((lemess = "error"));
  });
  console.log(lemess);
  return lemess;
}

module.exports = app;

// old test

//console.log("ttt" + req.body["test"]);
/*  
  for (let key in req.body) {
    console.log(key + " __ : " + req.body[key]);
  }

  console.log(schema.validate("invalidPASS"));
  console.log(schema.validate("1234"));
  console.log(schema.validate("000"));
  console.log(schema.validate("ab"));
  console.log(req.body["test"]);
   */
