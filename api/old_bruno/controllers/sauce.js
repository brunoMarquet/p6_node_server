const { off } = require("../app");

exports.getLesSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};
exports.getUneSauce = (req, ses, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({ error: "réf non trouvée" });
    });
};
//deleteUneSauce
exports.deleteUneSauce = (req, ses, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json({ message: "sauce effacée" });
    })
    .catch((error) => {
      res.status(400).json({ error: "réf non trouvée-400?" });
    });
};
//noterUneSauce
exports.noterUneSauce = (req, ses, next) => {
    const note = req.body.like;
  const userId = req.body.userId;
  Sauce.findOne({ _id: req.params.id })
  .then((sauce) => {
    const usersLiked = sauce.usersLiked
    const usersDisliked = sauce.usersDisliked
    const indexL=usersLiked.indexOf(userId);
    const indexD=usersDisliked.indexOf(userId);

    if (note>0 && indexL>-01){
        //user deja aime -in n'en titen âs cpte RAZ

    }
    if (note<0 && indexD>-01){
        //user dejs cpté RAZ

    }
    if (note<0 && indexL>-01){
        
       // usersLiked delete user
       
    }




  /* Sauce.findOne({ _id: req.params.id })
    

    if()
      .then((sauce) => {
        res.status(200).json({ message: "sauce effacée" });
      })
      .catch((error) => {
        res.status(404).json({ error: "réf non trouvée" });
      });
}; */
