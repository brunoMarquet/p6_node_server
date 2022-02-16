const Sauce = require("../models/Sauce");
const fs = require("fs");
const xss = require("xss");

/* const uneSauce = {
  name: "88",
  manufacturer: "888",
  description: "888888888888888",
  mainPepper: "poivron",
  heat: "4",
  userId: "61f80137ef1ccf7a58ac2f05",
}; //a revoir
 */
function editProp(sauceObject) {
  for (let key in sauceObject) {
    if (sauceObject.hasOwnProperty(key)) {
      console.log(key + " : " + sauceObject[key]);
    }
  }
}
function verifToken(theId) {
  console.log(" token55", theId);
  return;
  /**pour modif et delete */
  // try {
  //const token = req.headers.authorization.split(" ")[1];
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET_101");
  const userId = decodedToken.userId;
  console.log(theId + " ,  " + userId);
  // averifier....
  if (theId === userId) {
    console.log("api/sauces  _tokEEE___");
    return true;
  } else {
    console.log("api/sauces  _BAd___");
    return false;
  }
}

exports.createSauceTest____ = (req, res, next) => {
  //console.log("test " + req.file.filename);

  const sauceObject = JSON.parse(req.body.sauce);
  /*  for (let key in sauceObject) {
    if (sauceObject.hasOwnProperty(key)) {
      console.log(key + " _ " + sauceObject[key]);
    }
  } */
  console.log(sauceObject["usersId"]);

  for (let key in req.file) {
    if (req.file.hasOwnProperty(key)) {
      console.log(`prop_file : ${key} _ ${req.file[key]}`);
    }
  }

  /* const sauce = new Sauce({
    ...sauceObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, 
    imageUrl: "titi.jpg",
    likes: "0",
    dislikes: "0",
  }); */
};

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);

  editProp(sauceObject);
  console.log("_______________");
  editProp(req.file);
  console.log("______param_________");
  editProp(req.params);
  /* 
  for (let key in ) {
    if (sauceObject.hasOwnProperty(key)) {
      console.log(`prop : ${key} _ ${sauceObject[key]}`);
    }
  }

  //console.log("path " + req.file.filename);

  for (let key in req.file) {
    if (req.file.hasOwnProperty(key)) {
      console.log(`prop_file : ${key} _ ${req.file[key]}`);
    }
  } */
  //delete sauceObject._id;
  // a valider
  const sauce = new Sauce({
    ...sauceObject,
    description:
      sauceObject.description + "____" + new Date() + " __user  a voir",

    /* si l'on veut verifier les entrees 

    name: xss(sauceObject.name),
    manufacturer: xss(sauceObject.manufacturer),
    description: xss(sauceObject.description),
    mainPepper: xss(sauceObject.mainPepper), 
    */

    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    //imageUrl: "toto.gif",
    likes: "0",
    dislikes: "0",
  });

  console.log(
    ` liens : ${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  );
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};
exports.infodate = (req, res, next) => {
  console.log(" en lecture rs  infodate-- (getAllSauce) : ", res.locals);

  next();
};

exports.getAllSauce = (req, res, next) => {
  console.log("res  en lecture(getAllSauce) : ", res.locals);

  //console.log(" en lecture rs   (user ) : ", res.locals.userId);

  /* console.log("depuis token vers sauces" + res.locals.userId);
 
  console.log("_________________");
  console.log(JSON.stringify(req.headers)); */
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifySauce = (req, res, next) => {
  // je comprends pas
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (req.file) {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Objet modifié !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      verifToken(sauce.userId);
      // console.log("verifToken");
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.aimer = (req, res, next) => {
  let userLike = req.body.like; // 0,+1 ou -1
  let userId = req.body.userId;
  let leMessage = "";

  //console.log("vote: " + userLike + "__userId_" + userId);
  const idSauce = req.params.id;
  //console.log("id_sauce" + idSauce);
  //let arrayVote = trouverSauce(idSauce);
  //console.log(arrayVote);

  // const truc = ["titi", "tot", "tata"];
  // console.log(truc);

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const usersLiked = sauce.usersLiked;
      const usersDisliked = sauce.usersDisliked;

      const retour = gererNote(userLike, userId, usersLiked, usersDisliked);

      //si 0
      if (userLike == 0) {
        //où est l'utisisateur?
        const foundUserLiked = usersLiked.find((usersId) => usersId == userId);
        const foundUserDisliked = usersDisliked.find(
          (usersId) => usersId == userId
        );

        //si dans liked
        if (foundUserLiked) {
          //suppression dans Usersliked et -1 dans likes
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          )
            .then(() =>
              res.status(200).json({ message: "L'utilisateur n'aime plus" })
            )
            .catch((error) => res.status(400).json({ error }));

          //si dans disliked
        } else if (foundUserDisliked) {
          //suppression dans Usersdisliked et -1 dans dislikes
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
          )
            .then(() =>
              res.status(200).json({ message: "L'utilisateur ne déteste plus" })
            )
            .catch((error) => res.status(400).json({ error }));
        }

        //si 1
      } else if (userLike == 1) {
        //ajout dans Usersliked et +1 dans likes
        Sauce.updateOne(
          { _id: req.params.id },
          { $push: { usersLiked: userId }, $inc: { likes: 1 } }
        )
          .then(() => res.status(200).json({ message: "L'utilisateur aime" }))
          .catch((error) => res.status(400).json({ error }));

        //si -1
      } else if (userLike == -1) {
        //ajout dans Usersdisliked et +1 dans dislikes
        Sauce.updateOne(
          { _id: req.params.id },
          { $push: { usersDisliked: userId }, $inc: { dislikes: 1 } }
        )
          .then(() =>
            res.status(200).json({ message: "L'utilisateur n'aime pas" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

function gererNote(note, userId, usersLiked, usersDisliked) {
  //const fruits = []; //, "Orange", "Apple", "Mango", "Kiwi"];
  // fruits.splice(0, 1);
  //console.log("long" + fruits.length);
  //console.log("ii " + fruits.indexOf(userId));

  const jaime = usersLiked.indexOf(userId);
  const jaimePas = usersDisliked.indexOf(userId);
  let type = 0; //true pour modifier i like..
  // console.log("present/absent" + jaime + "_" + jaimePas);
  //console.log(usersLiked);
  // console.log(usersDisliked);

  let leMessage = "";
  if (note === 0) {
    if (jaime !== -1) {
      //
      type = "L";
      leMessage = "vous aimiez, maintenant vous etes neutre";
      console.log(usersLiked.length + " _ " + jaime + " __" + usersLiked);

      //usersLiked.splice(0, 1);
      //splice(parseInt(jaime), 1);
      console.log(leMessage + " _ "); // + usersLiked);

      // return [type, usersLiked, leMessage];
    }
    if (jaimePas !== -1) {
      type = "D";
      leMessage = "vous detestiez, maintenant vous etes neutre";
      console.log(
        leMessage + " _lengt " + usersDisliked.length + " indice" + jaimePas
      );
      if (usersDisliked[jaimePas] === usersId) console.log();
      // usersDisliked.splice(parseInt(jaimePas), 1);

      // return [type, usersLiked, leMessage];
    }
  }
  if (jaime === -1 && jaimePas === -1) {
    //le user est absent des listes
    if (note === 1) {
      type = "L";
      leMessage = "vous etiez neutre, maintenant vous aimez";
      usersLiked.push(userId);
      console.log(leMessage + " _ " + usersLiked);
    }
    if (note === -1) {
      type = "D";
      leMessage = "vous etiez neutre, maintenant vous detestez";
      usersDisliked.push(userId);
      console.log(leMessage + " _ " + usersDisliked);
    }
  }

  return "";

  /* if (note == 1 || jaime == -1) {
    leMessage = "vous n'aviez pas d'avis, maintenant vous aimez";
    usersLiked.push(userId);
    //return [bol, usersLiked, leMessage];
  }
  if (note == 0 && jaime != -1) {
    leMessage = "vous aimiez, maintenant vous etes neutre";
    // usersLiked.splice(jaimePas, 1);
    // return [bol, usersLiked, leMessage];
  } */
}
