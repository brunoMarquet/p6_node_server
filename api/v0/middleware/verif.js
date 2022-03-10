const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET_101");
    const userId = decodedToken.userId;
    const userMail = decodedToken.userMail;

    const mail = res.locals.email;

    res.locals.date = Date.now();
    res.locals.userId = userId;
    res.locals.mail = userMail;
    next();
  } catch {
    res.status(401).json({
      error: new Error("user+ token NON ok !"),
    });
  }
};

/*
function editProp(sauceObject) {
  for (let key in sauceObject) {
    if (sauceObject.hasOwnProperty(key)) {
      console.log(key + " : " + sauceObject[key]);
    }
  }
} */
