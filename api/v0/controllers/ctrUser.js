const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const clefToken = "RANDOM_TOKEN_SECRET_101";
//const maskData = require("maskdata");
const passwordValidator = require("password-validator");
const reglemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const schemaPassValid = new passwordValidator();

schemaPassValid
  .is()
  .min(3) // Minimum length 3
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["000", "123"]); // Blacklist these values

function verifReq(req) {
  // console.log(schema.validate("jok e", { details: true }));
  if (req.body["password"] && req.body["email"]) {
    return true;
  }
}
function estValide(value, regle) {
  return regle.test(value);
}

signup = (req, res, next) => {
  //let erreur = 0;
  //let leMessage = "";
  // console.log("sign_up !");

  if (verifReq(req)) {
    const psw = req.body["password"];
    const mail = req.body["email"];
    console.log(`hello_sign_up! ${mail} pass ${psw}`);

    if (!schemaPassValid.validate(psw)) {
      console.log("mot de passe pas adapté !");
      res.status(401).json({
        message: "mot de passe pas adapté !",
      });
    }
    if (!estValide(mail, reglemail)) {
      console.log("votre mail parait mauvais !");
      res.status(401).json({
        message: "votre mail parait mauvais !",
      });
    }
    if (User.findOne({ email: mail })) {
      console.log(mail + " : mot de passe deja pris !");
      //c'est un doublon
    }
    const d = new Date();
    let laDate = `${d.getDate()}_${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}`;
    // res.locals.userId = userId;
    res.locals.mail = mail;

    bcrypt
      .hash(psw, 10)
      .then((hash) => {
        const user = new User({
          email: mail,
          password: hash,
          age: Math.floor(Math.random() * 40) + 18,
          date: laDate,
        });
        console.log("user à creer ???_ " + mail);
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    console.log("les parametres ne collent pas !");
  }
};

login = (req, res, next) => {
  if (verifReq(req)) {
    const psw = req.body["password"];
    const mail = req.body["email"];
    User.findOne({ email: mail })
      .then((user) => {
        if (!user) {
          console.log("user  Non ok !");
          return res
            .status(401)
            .json({ error: "Utilisateur " + mail + "non trouvé !" });
        }
        bcrypt
          .compare(psw, user.password)
          .then((valid) => {
            if (!valid) {
              console.log("user+ Mot de passe " + psw + "incorrect NON ok!");
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !" });
            }
            console.log(`user :  ${mail} login  ok!${new Date()}`);

            // res.locals.userId = user._id;
            // res.locals.mail = mail;
            res.status(200).json({
              test: "classRoom",
              userId: user._id,
              token: jwt.sign({ userId: user._id, userMail: mail }, clefToken, {
                expiresIn: "24h",
              }),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    console.log("les parametres ne collent pas !");
  }
};

getAllUser = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
testUser = (req, res, next) => {
  console.log("truc" + res.locals.testTruc);
  res.locals.testToken = jwt.sign({ truc2: res.locals.testTruc }, clefToken, {
    expiresIn: "24h",
  });
  next();
};
module.exports = { login, signup, getAllUser, testUser };
