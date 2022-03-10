//document.getElementById("lesSauces").style.display = "none";
/* var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/xml");
myHeaders.append("Vary", "Accept-Language");

// Display the key/value pairs
for (var pair of myHeaders.entries()) {
  console.log(pair[0] + ": " + pair[1]);
} */

function backAllSauce() {
  window.location = "listSauce.html";
}

function editUser() {
  console.log("user...");
}
function logOut() {
  window.location = "index.html";
  localStorage.clear();
}
function ajoutSauce() {
  console.log("ajoutSauce...");
  window.location = "ajout.html";
}
function jaimePas(number) {
  let unId = localStorage.getItem("sauceId");
  console.log("aime pas" + number);
}
function jaime(number) {
  let unId = localStorage.getItem("sauceId");
  console.log("love " + number);
  //{ userId: String,like: Number }
  const envoiPost = { userId: String, like: Number };
  const options = formatReq("POST", envoiPost);
  //app.post(pathSauce + ":id/like", verif, sauceCtrl.aimerSauce);
  let url = `http://localhost:3000/api/sauces/${unId}/like`;
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${leToken}`,
    },
  });
}
function effacer() {
  //3000/api/sauces/62013cce8d54cd0e11f0a88d
  let unId = localStorage.getItem("sauceId");
  // unId = "62013cce8d54cd0e11f0a88d";

  let url = `http://localhost:3000/api/sauces/${unId}`;
  console.log("raz_url:  ", url);

  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${leToken}`,
    },
  })
    .then((res) => res.json())

    .then((res) => {
      alert("Delete " + unId);
      console.log(res);
      window.location = "listSauce.html";
    })
    .catch(function (error) {
      alert(error);
    });

  //", unId);

  //console.log("url");
}
function modifier() {
  unId = localStorage.getItem("sauceId");
  //unId = localStorage.getItem("sauceId");

  console.log("modif  ", unId);
  window.location = "ajout.html?id=" + unId;
  //, unId);
}
function actuHeat(nbre) {
  document.getElementById("heatCase").innerHTML = nbre;
}

function modifSauce() {}

function getAllSauces() {
  let url = "http://localhost:3000/api/sauces";

  // const options = formatReq("POST",);
  //console.log("header 233333");
  leToken = localStorage.getItem("token");
  console.log("getAllSauces _:_ ", leToken);
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${leToken}`,
    },
  })
    .then((res) => res.json())

    .then((res) => {
      localStorage.removeItem("sauceId");
      let texte = "";

      for (sauce of res) {
        texte +=
          "<article class='spicySauce'><a href='sauce.html?id=" +
          sauce._id +
          "'><h2>" +
          sauce.name +
          "</h2>by " +
          sauce.manufacturer +
          " <img src='" +
          sauce.imageUrl +
          "'><br>  Description : " +
          sauce.description +
          "<br>hot : " +
          sauce.heat +
          "/10  </a></article>";
      }
      // alert(texte);
      document.getElementById("lesSauces2").innerHTML = texte;
      // const innerRep = document.getElementById("idTestPass");
    })
    .catch(function (error) {
      alert(error);
    });
}

function preLog() {
  event.preventDefault();
  const leMail = document.getElementById("email").value;
  const lePsw = document.getElementById("psw").value;
  if (leMail !== "" && lePsw !== "") {
    myLog(leMail, lePsw);
  } else {
    alert("remplir les cases");
  }
}

///////////////////get!!
function formatReq(methode, envoiPost) {
  //methode = "POST";
  const Unmessage = {
    method: methode,
    body: JSON.stringify(envoiPost),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return Unmessage;
}
function myLog(mail, psw) {
  // const user = userTxt.split(",@,");
  //console.log(`hello :  ${user[0]} , pass _:   ${user[1]} `);
  const envoiPost = { email: mail, password: psw };
  const options = formatReq("POST", envoiPost);
  let url = "http://localhost:3000/api/auth/login";
  fetch(url, options)
    .then((res) => res.json())

    .then((res) => {
      console.log(res);

      editSauce(res);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function mySignUp() {
  event.preventDefault();
  const leMail = document.getElementById("email").value;
  const lePsw = document.getElementById("psw").value;
  if (leMail !== "" && lePsw !== "") {
    const envoiPost = { email: leMail, password: lePsw };
    const options = formatReq("POST", envoiPost);
    let url = "http://localhost:3000/api/auth/signup";
    fetch(url, options)
      .then((res) => res.json())

      .then((res) => {
        console.log("signUp ", res);

        myLog(leMail, lePsw);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
function logExemple(userTxt) {
  if (userTxt !== "") {
    const user = userTxt.split(",@,");
    //console.log(`hello :  ${user[0]} , pass _:   ${user[1]} `);
    myLog(user[0], user[1]);
  }
}

function editSauce(res) {
  //console.log(res.userId);
  if (res.userId) {
    localStorage.setItem("token", res.token);
    localStorage.setItem("userId", res.userId);
    leToken = res.token;
    leUserId = res.userId;
    window.location = "listSauce.html";

    //let url3 = "http://localhost:3000//api/auth/verif";

    document.getElementById("errorHtml").innerHTML =
      "" + leUserId + "<br>" + leToken;
    document.getElementById("lesSauces").style.display = "block";
  } else {
    console.log(res.error);
    document.getElementById("errorHtml").innerHTML = res.error;
    //?
    document.getElementById("lesSauces").style.display = "none";
  }
}
function afficheUser() {
  event.preventDefault();

  //console.log("valeur");
  const url = "http://localhost:3000/api/auth";
  //const options = formatReq("get", { test: valeur });
  debugger;
  fetch(url, { method: "GET" })
    .then((res) => res.json())

    .then((res) => {
      let texte = "666666";
      console.log(res);
      res.status(200).json(users2);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
}
