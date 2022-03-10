initSauce();

function initSauce() {
  //console.log("tokk : ", res.token);
  //console.log("user ", res.userId);
  const tok = localStorage.getItem("token");
  const userID = localStorage.getItem("userId");

  console.log("userID: ", userID);
  console.log("tokern  ", tok);

  getAllSauces();
}
//
