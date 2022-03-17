const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/GIF": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "imagesFolder");
  },

  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    /**remplacer les espaces/tirets
     *
     * let result = text.replaceAll(" ", "_");
     *
     * est mieux ou plus simple!
     *
     */

    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
