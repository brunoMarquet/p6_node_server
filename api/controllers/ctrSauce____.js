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

exports.createSauceTest = (req, res, next) => {
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

  for (let key in sauceObject) {
    if (sauceObject.hasOwnProperty(key)) {
      console.log(`prop : ${key} _ ${sauceObject[key]}`);
    }
  }

  //console.log("path " + req.file.filename);

  for (let key in req.file) {
    if (req.file.hasOwnProperty(key)) {
      console.log(`prop_file : ${key} _ ${req.file[key]}`);
    }
  }
  //delete sauceObject._id;
  // a valider
  const sauce = new Sauce({
    ...sauceObject,

    /* si l'on veut verifier les entrees 

    name: xss(sauceObject.name),
    manufacturer: xss(sauceObject.manufacturer),
    description: xss(sauceObject.description),
    mainPepper: xss(sauceObject.mainPepper), 
    */

    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    // imageUrl: "toto.gif",
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

exports.getAllSauce = (req, res, next) => {
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
            .then(() =>
              res.status(200).json({ message: "Objet modifié (et son visuel " })
            )
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
      const pathname = "images/" + sauce.imageUrl.split("/images/")[1];
      fs.exists(pathname, (exists) => {
        console.log(exists ? "Found" : "Not Found!");
      });

      fs.unlink(pathname, () => {
        console.log(pathname + "supprimé !");
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

/**
 * 
 * {/api/sauces/:id/like { userId: String,
like: Number }}
 
 
 */

exports.aimer_old = (req, res, next) => {
  const userLike = req.body.like;
  const userId = req.body.userId;

  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const usersLiked = sauce.usersLiked;
    const usersDisliked = sauce.usersDisliked;

    message = "";
    const jaime = sauceCourante.iLike.indexOf(userCourant);
    const jaimePas = sauceCourante.idisLike.indexOf(userCourant);

    if (nbe == 1) {
      message = "aime; " + jaime + "pas: " + jaimePas;

      if (jaime != -1) {
        message = "vous avez deja voté";
      }
      if (jaime == -1 && jaimePas != -1) {
        message = "vous detestiez, maintenant vous etes neutre";
        sauceCourante.idisLike.splice(jaimePas, 1);
        sauceCourante.note++;
        // sauceCourante.iLike.push(userCourant);
      }
      if (jaime == -1 && jaimePas == -1) {
        message = "vous n'aviez pas d'avis, maintenant vous aimez";
        sauceCourante.note++;
        // alert( sauceCourante.note);
        sauceCourante.iLike.push(userCourant);
      }
    } else {
      // je n'aime pas...
      message = "malus " + jaime + " ,pas: " + jaimePas;

      if (jaimePas != -1) {
        message = "vous avez deja exprimé votre désaccord";
      }
      if (jaime != -1 && jaimePas == -1) {
        message = "vous n'avez pas aimé, maintenant vous ... ";
        sauceCourante.iLike.splice(jaimePas, 1);
        sauceCourante.note--;
      }
      if (jaime == -1 && jaimePas == -1) {
        message = "vous n'aviez pas d'avis, maintenant vous detestez ";
        sauceCourante.idisLike.push(userCourant);
        sauceCourante.note--;
      }
    }
    lesSauces[idsauce] = sauceCourante;
    showSauce(idsauce);
    document.getElementById("leMessage").innerHTML = message + "<br>";
  });
};
function gererNote(note, userId, usersLiked, usersDisliked) {
  const jaime = usersLiked.indexOf(userId);
  const jaimePas = usersDisliked.indexOf(userId);
  let type = 0; //true pour modifier i like..
  console.log("present/absent" + jaime + "_" + jaimePas);

  let leMessage = "";
  if (note == 0){
    if ( jaime != -1) { //
      type="L"
      leMessage = "vous aimiez, maintenant vous etes neutre";
      usersLiked.splice(jaime, 1);
      console.log(leMessage+" _ "+usersLiked)

      // return [type, usersLiked, leMessage];

    }
    if ( jaimePas != -1) { 
      type="D"
      leMessage = "vous detestiez, maintenant vous etes neutre";
      usersDisliked.splice(jaimePas, 1);
      console.log(leMessage+" _ "+usersDisliked)

      // return [type, usersLiked, leMessage];

    }

    
}
if  (note == 1 ){



  
  return "";

  if (note == 1 && jaime == -1) {
    leMessage = "vous n'aviez pas d'avis, maintenant vous aimez";
    usersLiked.push(userId);
    //return [bol, usersLiked, leMessage];
  }
  if (note == 0 && jaime != -1) {
    leMessage = "vous aimiez, maintenant vous etes neutre";
    // usersLiked.splice(jaimePas, 1);
    // return [bol, usersLiked, leMessage];
  }
}

exports.aimer = (req, res, next) => {
  let leMessage = "";
  const userLike = req.body.like;
  const userId = req.body.userId;
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
      /*
      console.log(retour); 
       console.log("liste qui aiment " + usersLiked);
      console.log("liste qui aiment pas" + usersDisliked);

      const jaime = sauceCourante.iLike.indexOf(userCourant);
      const jaimePas = sauceCourante.idisLike.indexOf(userCourant);
      console.log("debug" + jaimePas + " _ou_ " + jaime);

      */

      //

      //si 0
      if (userLike == 0) {
        console.log("on annule vote");
        const foundUserLiked = usersLiked.find((usersId) => usersId == userId);
        const foundUserDisliked = usersDisliked.find(
          (usersId) => usersId == userId
        );

        //si dans liked
        if (foundUserLiked) {
          //suppression dans Usersliked et -1 dans likes
          leMessage = "L'utilisateur n'aime plus";
          console.log(leMessage);
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          )
            .then(() => res.status(200).json({ message: leMessage }))
            .catch((error) => res.status(400).json({ error }));

          //si dans disliked
        } else if (foundUserDisliked) {
          //suppression dans Usersdisliked et -1 dans dislikes
          leMessage = "L'utilisateur ne déteste plus";
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
          )
            .then(() => res.status(200).json({ message: leMessage }))
            .catch((error) => res.status(400).json({ error }));
        }

        //si 1
      } else if (userLike == 1) {
        leMessage = "L'utilisateur aime";
        console.log(leMessage);
        //ajout dans Usersliked et +1 dans likes
        Sauce.updateOne(
          { _id: req.params.id },
          { $push: { usersLiked: userId }, $inc: { likes: 1 } }
        )
          .then(() => res.status(200).json({ message: leMessage }))
          .catch((error) => res.status(400).json({ error }));

        //si -1
      } else if (userLike == -1) {
        leMessage = "L'utilisateur n'aime plus";
        console.log(leMessage);
        //ajout dans Usersdisliked et +1 dans dislikes
        Sauce.updateOne(
          { _id: req.params.id },
          { $push: { usersDisliked: userId }, $inc: { dislikes: 1 } }
        )
          .then(() => res.status(200).json({ message: leMessage }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};
