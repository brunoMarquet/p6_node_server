const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/GIF": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    console.log("file ", file);
    console.log("multer ", name);
    /**remplacer les espace/tirets
     *
     * let result = text.replaceAll(" ", "_");
     *
     * est mieux ou plus simple!
     *
     */

    const extension = MIME_TYPES[file.mimetype];
    const fileName = name + Date.now() + "." + extension;
    callback(null, fileName);
  },
});

module.exports = multer({ storage: storage }).single("image");
