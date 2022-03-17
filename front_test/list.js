initSauce();

function initSauce() {
  //console.log("tokk : ", res.token);
  //console.log("user ", res.userId);
  const tok = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  // console.log("userID: ", userID);
  console.log("tokern  ", tok);
  //alert(userID);
  //
  getAllSauces();

  const tt2 = "email user :" + email;
  document.getElementById("userInfo").innerHTML = tt2;
}
//
