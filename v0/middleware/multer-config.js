const multer = require("multer");
const folderPict = "imagesFolder";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/GIF": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, folderPict);
  },

  filename: (req, file, callback) => {
    let name = file.originalname.split(" ").join("_") + Date.now();
    /**remplacer les espaces/tirets
     *
     * let result = text.replaceAll(" ", "_");
     *
     * est mieux ou plus simple! ne marche pas
     *
     */
    name =
      file.originalname.split(" ").join("_") +
      Math.floor(Math.random() * 100000);
    //variante

    name = file.originalname.split(".")[0];
    const nbre = file.originalname.split(".").length;
    console.log("nn", nbre);
    name = name.split(" ").join("_");
    name += "_" + Math.floor(Math.random() * 1000000);

    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
