const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET_101");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      //console.log(" token  ok" + new Date());
      next();
    }
  } catch {
    // console.log(" token NON ok !" + new Date());
    res.status(401).json({
      error: new Error("user+ token NON ok !"),
    });
  }
};
