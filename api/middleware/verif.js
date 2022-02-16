const jwt = require("jsonwebtoken");

function editProp(sauceObject) {
  for (let key in sauceObject) {
    if (sauceObject.hasOwnProperty(key)) {
      console.log(key + " : " + sauceObject[key]);
    }
  }
}
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET_101");
    const userId = decodedToken.userId;
    const userMail = decodedToken.userMail;
    console.log(JSON.stringify(req.body));

    //console.log("****************");
    //editProp(req.params);
    // console.log(JSON.stringify(req.headers));
    console.log("****************");
    console.log("from token " + userMail);
    /* console.log("from req-local:userId2 : " + req.locals.userId2);
    console.log("from token__ userId : " + userId);
    console.log("from token__ test :  " + req.body["test"]); */
    const qui = req.body["userId"];
    console.log("qui ", qui);
    const qui2 = req.body["test"];
    console.log("qui2 ", qui2);
    const qui3 = req.body.test;
    console.log("qui23 ", qui3);

    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      res.locals.date = Date.now();
      console.log("res  en lecture(verif) : ", res.locals);
      // res.locals.userId = userId;
      // res.locals.mail = userId;
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
