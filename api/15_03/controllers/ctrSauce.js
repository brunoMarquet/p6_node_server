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
function verifUser(theId) {}

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
};

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);

  editProp(sauceObject);
  console.log("_______________");
  editProp(req.file);
  console.log("______param_________");
  editProp(req.params);

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
  //console.log(" en lecture rs  infodate-- (getAllSauce) : ", res.locals);

  next();
};

exports.getAllSauce = (req, res, next) => {
  //console.log("res  en lecture in getAllSauce) : ", res.locals);

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
  console.log("MODIF", req.body);

  const idSauce = req.params.id;

  //

  /* 
  je comprends pas
 const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }; */

  //  Sauce.findOne({ _id: req.params.id })

  trouverSauce(idSauce)
    .then((sauce) => {
      if (res.locals.userId === sauce.userId) {
        console.log(" yes res.locals.userId");
        Sauce.updateOne({ _id: idSauce }, { ...sauce, _id: idSauce })
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(400).json({ error: "Objet modifié !" }));
      } else {
        console.log(" erreur userId");
        res.status(404).json({ error: "user pas autorisé" });
      }
    })

    .catch((error) => res.status(500).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  const idSauce = req.params.id;
  console.log("delete");
  console.log("verif", idSauce);
  //res.status(200).json({ message: "Stop_delete!888" });

  trouverSauce(idSauce)
    .then((sauce) => {
      if (res.locals.userId === sauce.userId) {
        console.log("usersId ok");
        res.status(200).json({ message: "Stop_delete!" });
      } else {
        console.log("usersId pas ok");
      }

      /* 
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      }); */
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.deleteSauce__8888888__ = (req, res, next) => {
  const idSauce = req.params.id;
  trouverSauce(idSauce)
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
function trouverSauce(idSauce) {
  return Sauce.findOne({ _id: idSauce });
}

exports.aimerSauce = (req, res, next) => {
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
  console.log("voteMoins: ", voteMoins, " mess ");
  console.log("usersAimePas : ", usersAimePas);
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

function saucePipo() {
  return;
  //  { name: "455_trop_bon cool" },

  const tab1 = [];
  /*  const tab1 = [ "titi" + Math.floor(Math.random() * 90),
    "leo" + Math.floor(Math.random() * 90),
  ]; */
  Sauce.updateOne(
    { _id: "61f705911ce6adcf127637e3" },
    {
      $set: {
        likes: Math.floor(Math.random() * 90),
        manufacturer: "Buitoni" + Math.floor(Math.random() * 90 + 1),
        usersLiked: tab1,
      },
    }
  )
    .then(() => console.log("updateOne ok "))
    .catch((error) => console.log("erreur"));
}
