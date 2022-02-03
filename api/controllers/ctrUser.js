const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
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
  console.log("sign_up !");

  if (verifReq(req)) {
    const psw = req.body["password"];
    const mail = req.body["email"];
    console.log("hello_sign_up! " + mail);
    if (!schemaPassValid.validate(psw)) {
      console.log("mot de passe pas adapté !");
      res.status(401).json({
        message: "mot de passe pas adapté !",
      });
    }
    if (!estValide(mail, reglemail)) {
      console.log("votre mail parait mauvais !");
      res.status(401).json({
        message: "vore mail parait mauvais !",
      });
    }

    bcrypt
      .hash(psw, 10)
      .then((hash) => {
        const user = new User({
          email: mail,
          password: hash,
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
          console.log("user  NON ok !");
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
            console.log("user login  ok!");
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET_101", {
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
module.exports = { login, signup };
/* 
exports.signup____ = (req, res, next) => {
  const psw = req.body["password"];
  const mail = req.body["email"];
  console.log("hello_sign_up! " + mail);
  if (!schemaPassValid.validate(psw)) {
    console.log("mot de passe pas adapté !");
    res.status(401).json({
      message: "mot de passe pas adapté !",
    });
  }
  bcrypt
    .hash(psw, 10)
    .then((hash) => {
      const user = new User({
        email: mail,
        password: hash,
      });
      console.log("user à creer ???_ " + mail);
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
}; */
