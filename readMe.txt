le package.json est normalement ok
donc npm init pour installer les nodes modules dont express...etc 


* le server.js est au premier niveau
donc pour demarrer :
node server


* api/imagesFolder : qui stocke les images
avec const folderPict = "imagesFolder";

*fonctionnel dans un folder v0 ici (pour faciliter  des back up de qq. koctets)

front end compilé angular fourni par un tiers.
a titre de test et de "pédagogie j' ai commencé un front end simple fourni en zip ()

* le serveur  ponte vers app simple telles que demandée...
const app = require("./v0/app");
mais peu etre orienté vers appNoRoute.js 
avec 

//const app = require("./v0/appNoRoute");


(fichier avec des routes telles que: app.get("/api/saucesBy/:id", truc14, verif, sauceCtrl.getAllSauceByUser);
etdes middlewares internes comme "truc14"=




