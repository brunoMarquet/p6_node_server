const Sauce = require("../models/Sauce");
const fs = require("fs");
const xss = require("xss");

function editProp(sauceObject) {
  for (let key in sauceObject) {
    if (sauceObject.hasOwnProperty(key)) {
      console.log(key + " : " + sauceObject[key]);
    }
  }
}

function trouverSauce(idSauce) {
  return Sauce.findOne({ _id: idSauce });
}

exports.createSauce = (req, res, next) => {
  if (res.locals.userId) {
    const sauceObject = JSON.parse(req.body.sauce);

    editProp(sauceObject);
    console.log("_______________");
    editProp(req.file);
    console.log("______param_________");
    editProp(req.params);

    console.log("path " + req.file.filename);

    const sauce = new Sauce({
      ...sauceObject,
      description: `user : ${res.locals.mail} , ${
        sauceObject.description
      } _date_ ${new Date()} !`,

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
      ` liens : ${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`
    );
    sauce
      .save()
      .then(() =>
        res
          .status(201)
          .json({ message: "Objet enregistré  par " + res.locals.mail })
      )
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.infodate = (req, res, next) => {
  //console.log(" en lecture rs  infodate-- (getAllSauce) : ", res.locals);
  next();
};

exports.getAllSauce = (req, res, next) => {
  // console.log("res  en lecture(getAllSauce) : ", res.locals);

  //console.log(" en lecture rs   (user ) : ", res.locals.userId);
  if (res.locals.userId) {
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
  }
};

exports.getOneSauce = (req, res, next) => {
  if (res.locals.userId) {
    const idSauce = req.params.id;
    trouverSauce(idSauce)
      .then((sauce) => {
        res.status(200).json(sauce);
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  }
};

exports.modifySauce = (req, res, next) => {
  // je comprends pas
  if (res.locals.userId) {
    const sauceObject = req.file
      ? {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };

    //
    if (req.file) {
      console.log(req.file);
    }

    /*  if (req.file) {
    const sauceObject = {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };
  } else {
    const sauceObject = { ...req.body };
  } */

    const idSauce = req.params.id;
    trouverSauce(idSauce)
      .then((sauce) => {
        if (res.locals.userId === sauce.userId) {
          if (req.file) {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              // Sauce.updateOne({ _id: idSauce }, { ...sauceObject, _id: idSauce })
              saveSauce(idSauce, sauceObject)
                .then(() =>
                  res
                    .status(200)
                    .json({ message: "Objet modifié par " + res.locals.mail })
                )
                .catch((error) => res.status(400).json({ error }));
            });
          } else {
            //Sauce.updateOne({ _id: idSauce }, { ...sauceObject, _id: idSauce })
            saveSauce(idSauce, sauceObject)
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Objet modifié  par " + res.locals.mail })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        } else {
          res.status(400).json({ message: "usersId n'a pas les droits !" });
          console.error("usersId pas ok");
        }
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.deleteSauce = (req, res, next) => {
  if (res.locals.userId) {
    const idSauce = req.params.id;

    trouverSauce(idSauce)
      .then((sauce) => {
        if (res.locals.userId === sauce.userId) {
          console.log("delete verif", idSauce);
          //console.log("usersId ok");
          const filename =
            "imagesFolder/" + sauce.imageUrl.split("/images/")[1];
          if (fs.existsSync(filename)) {
            /* //
          fs.unlink(filename, () => {
            Sauce.deleteOne({ _id: idSauce })
              .then(() => res.status(200).json({ message: "Objet supprimé !" }))
              .catch((error) => res.status(400).json({ error }));
          }); */

            fs.unlink(filename, () => {
              Sauce.deleteOne({ _id: idSauce })
                .then(() =>
                  res
                    .status(200)
                    .json({ message: "Objet supprimé par " + res.locals.mail })
                )
                .catch((error) => res.status(400).json({ error }));
            });
          }
        } else {
          res.status(200).json({ message: "usersId n'a pas les droits !" });
          console.log("usersId pas ok");
        }
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.aimerSauce = (req, res, next) => {
  if (res.locals.userId) {
    let laNote = req.body.like; // 0,+1 ou -1
    let userId = req.body.userId;
    const idSauce = req.params.id;
    let leMessage = "";
    //saucePipo();

    trouverSauce(idSauce)
      .then((sauce) => {
        //const usersLiked = sauce.usersLiked;
        // const usersDisliked = sauce.usersDisliked;
        let usersAime = sauce.usersLiked;
        let usersAimePas = sauce.usersDisliked;
        let votePlus = sauce.likes;
        let voteMoins = sauce.dislikes;

        //const retour = gererNote(laNote, userId, usersAime, usersAimePas);
        if (laNote == 1) {
          //ajout dans Usersliked et +1 dans likes
          votePlus++;
          usersAime.push(userId);
          leMessage = "L'utilisateur aime";
          likeActu(idSauce, votePlus, usersAime)
            .then(() => res.status(200).json({ message: leMessage }))
            .catch((error) => res.status(400).json({ error }));
        }
        if (laNote == -1) {
          //ajout dans Usersdisliked et +1 dans dislikes
          voteMoins++;
          usersAimePas.push(userId);
          leMessage = "L'utilisateur n'aime pas";
          //console.log("medoum");
          disLikeActu(idSauce, voteMoins, usersAimePas)
            .then(() => res.status(200).json({ message: leMessage }))
            .catch((error) => res.status(400).json({ error }));
        }

        if (laNote == 0) {
          // const jaime = usersAime.find((usersId) => usersId == userId);
          // const jaimePas = usersAimePas.find((usersId) => usersId == userId);
          const jaime = usersAime.indexOf(userId);
          const jaimePas = usersAimePas.indexOf(userId);

          //si dans liked
          // if (jaime) {
          if (jaime !== -1) {
            //suppression dans Usersliked et -1 dans likes
            votePlus--;
            usersAime.splice(parseInt(jaime), 1);
            leMessage = "L'utilisateur n'aime plus";
            likeActu(idSauce, votePlus, usersAime)
              .then(() => res.status(200).json({ message: leMessage }))
              .catch((error) => res.status(400).json({ error }));

            //si dans disliked
          } else if (jaimePas !== -1) {
            //suppression dans Usersdisliked et -1 dans dislikes
            voteMoins--;
            usersAimePas.splice(parseInt(jaimePas), 1);
            leMessage = "L'utilisateur ne déteste plus";
            disLikeActu(idSauce, voteMoins, usersAimePas)
              .then(() => res.status(200).json({ message: leMessage }))
              .catch((error) => res.status(400).json({ error }));
          }
        }
      })
      .catch((error) => {
        res.status(404).json({ error: error });
      });
  }
};

function likeActu(idSauce, votePlus, usersAime) {
  /*  console.log("votePlus: ", votePlus, " mess " );
  console.log("usersAime : ", usersAime); */
  return Sauce.updateOne(
    { _id: idSauce },
    {
      $set: {
        likes: votePlus,
        usersLiked: usersAime,
      },
    }
  );
}

function disLikeActu(idSauce, voteMoins, usersAimePas) {
  /*  console.log("voteMoins: ", voteMoins, " mess ");
  console.log("usersAimePas : ", usersAimePas); */
  return Sauce.updateOne(
    { _id: idSauce },
    {
      $set: {
        dislikes: voteMoins,
        usersDisliked: usersAimePas,
      },
    }
  );
}
function saveSauce(idSauce, sauce) {
  return Sauce.updateOne({ _id: idSauce }, { ...sauce, _id: idSauce });
}

///
/**
 * function verifUser(theId, sauceUser) {
  if (theId === sauceUser) {
    return true;
  }
}
 */