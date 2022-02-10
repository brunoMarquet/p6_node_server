const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: false },
  description: { type: String, required: false },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: false },
  heat: { type: Number, required: false },
  likes: { type: Number, required: false },
  dislikes: { type: Number, required: false },
  usersLiked: { type: Array, required: false },
  usersDisliked: { type: Array, required: false },
});

module.exports = mongoose.model("Sauce", sauceSchema);
/*
 userId : String — l'identifiant MongoDB unique de l'utilisateur qui a créé la
sauce
● name : String — nom de la sauce
● manufacturer : String — fabricant de la sauce
● description : String — description de la sauce
● mainPepper : String — le principal ingrédient épicé de la sauce
● imageUrl : String — l'URL de l'image de la sauce téléchargée par l'utilisateur
● heat : Number — nombre entre 1 et 10 décrivant la sauce
● likes : Number — nombre d'utilisateurs qui aiment (= likent) la sauce
● dislikes : Number — nombre d'utilisateurs qui n'aiment pas (= dislike) la
sauce
● usersLiked : [ "String <userId>" ] — tableau des identifiants des utilisateurs
qui ont aimé (= liked) la sauce
● usersDisliked : [ "String <userId>" ] — tableau des identifiants des
*/
