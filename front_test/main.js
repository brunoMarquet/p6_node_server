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
  window.location = "ajout.html?id=0";
}
function modifier() {
  unId = localStorage.getItem("sauceId");
  //unId = localStorage.getItem("sauceId");

  //console.log("modif  ", unId);
  window.location = "ajout.html?id=" + unId;
  //, unId);
}

function jaime(number) {
  let unId = localStorage.getItem("sauceId");
  let userId = localStorage.getItem("userId");
  const envoiPost = { userId: userId, like: number };
  let leToken = localStorage.getItem("token");

  //http://localhost:3000/api/sauces/61f801e4ef1ccf7a58ac2f0e/like
  let url = `http://localhost:3000/api/sauces/${unId}/like`;
  //console.log("url ", url);

  fetch(url, {
    method: "POST",
    body: JSON.stringify(envoiPost),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${leToken}`,
    },
  })
    .then((res) => res.json())

    .then((res) => {
      console.log(res);
      scoreP = res.score[0];
      scoreN = res.score[1];
      ilike = res.userVote[0];
      inolike = res.userVote[1];

      let txtNotes = affichNotes(ilike, inolike, scoreP, scoreN);
      document.getElementById("scoreSauce").innerHTML = txtNotes;
    })
    .catch(function (error) {
      console.log(error);
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
}

function actuHeat(nbre) {
  document.getElementById("heatCase").innerHTML = nbre;
}

function modifSauce() {}

function SauceCreerApi(untruc) {
  // aa=http://localhost:3000/api/sauces/${unId}

  let leToken = localStorage.getItem("token");
  const user = localStorage.getItem("userId");
  let url = "http://localhost:3000/api/saucesBy/" + user;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${leToken}`,
    },
  })
    .then((res) => res.json())

    .then((res) => {
      let texte = "";

      for (sauce of res) {
        texte += `<article class='spicySauce'><a href='sauce.html?id=${sauce._id}'><h2>${sauce.name}</h2><p>by ${sauce.manufacturer}
        <img src='${sauce.imageUrl}'></p> <div class='tt2'> Description : "${sauce.description}<h2>hot : ${sauce.heat}/10 </h2> </div></a></article>`;
      }

      document.getElementById("lesSauces2").innerHTML = texte;
    })
    .catch(function (error) {
      alert(error);
    });
}

function SauceCreer(type) {
  // by user...
  //0 => crerr
  let url = "http://localhost:3000/api/sauces";

  let leToken = localStorage.getItem("token");
  const user = localStorage.getItem("userId");
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

      if (type === "creer") {
        texte += "sauces crées par...";
        for (sauce of res) {
          if (sauce.userId === user) {
            texte += `<article class='spicySauce'><a href='sauce.html?id=${sauce._id}'><h2>${sauce.name}</h2><p>by ${sauce.manufacturer}
        <img src='${sauce.imageUrl}'></p> <div class='tt2'> Description : "${sauce.description}<h2>hot : ${sauce.heat}/10 </h2> </div></a></article>`;
          }
        }
      }
      if (type === "liker") {
        texte += "sauces likées par...";
        for (sauce of res) {
          if (sauce.usersLiked.indexOf(user) !== -1) {
            texte += `<article class='spicySauce'><a href='sauce.html?id=${sauce._id}'><h2>${sauce.name}</h2><p>by ${sauce.manufacturer}
                <img src='${sauce.imageUrl}'></p> <div class='tt2'> Description : "${sauce.description}<h2>hot : ${sauce.heat}/10 </h2> </div></a></article>`;
          }
        }
      }

      document.getElementById("lesSauces2").innerHTML = texte;
    })
    .catch(function (error) {
      alert(error);
    });
}

function getAllSauces() {
  let url = "http://localhost:3000/api/sauces";

  let leToken = localStorage.getItem("token");
  console.log("getAllSauces _:_ ", leToken);
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${leToken}`,
    },
  })
    .then((res) => res.json())

    .then((res) => {
      // afficher
      localStorage.removeItem("sauceId");
      let texte = "";

      for (sauce of res) {
        texte += `<article class='spicySauce'><a href='sauce.html?id=${sauce._id}'><h2>${sauce.name}</h2><p>by ${sauce.manufacturer}
        <img src='${sauce.imageUrl}'></p> <div class='tt2'> Description : "${sauce.description}<h2>hot : ${sauce.heat}/10 </h2> </div></a></article>

`;
      }
      // alert(texte);
      document.getElementById("lesSauces2").innerHTML = texte;
      //document.getElementById("userInfo").innerHTML = userID;
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
  localStorage.setItem("email", mail);
  const envoiPost = { email: mail, password: psw };
  const options = formatReq("POST", envoiPost);
  let url = "http://localhost:3000/api/auth/login";

  fetch(url, {
    method: "POST",
    body: JSON.stringify(envoiPost),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer toto_1002`,
    },
  })
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
  } else {
    console.log(res.error);
  }
}
