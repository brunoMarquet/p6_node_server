document.getElementById("lesSauces").style.display = "none";

function actuHeat(nbre) {
  document.getElementById("heatCase").innerHTML = nbre;
}
function addSauce() {
  const list = ["name", "manufacturer", "description", "mainPepper", "heat"];
  const cpt = 0;
  let laSauce = {};
  for (let key in list) {
    const laKey = list[key];
    const valeur = document.getElementById(laKey).value;
    laSauce[laKey] = valeur;
    //if (valeur){}
    //  console.log();
  }
  console.log(laSauce);
  let imagePath = "C:\fake_pathlogo.png";
  if (document.getElementById("imageUrl").value) {
    const imagePath = document.getElementById("imageUrl").value;
  }
  console.log(imagePath);
}

function modifSauce() {}

function getAllSauces() {
  let url = "http://localhost:3000/api/sauces";

  // const options = formatReq("POST",);
  // console.log(headers.authorization);

  fetch(url, { method: "GET" })
    .then((res) => res.json())

    .then((res) => {
      let texte = "666666";
      console.log(res);

      document.getElementById("infoSauces").innerHTML = texte;
      // const innerRep = document.getElementById("idTestPass");
    })
    .catch(function (error) {
      alert(error);
    });
}
function allSauces() {
  /**
   * pour avoir un post au lieu d'un get et ainsi
   * avoir une requete(le token)
   */
  let url = "http://localhost:3000/api/saucesTest";
  const envoiPost = { idUser: leUserId, token: leToken };
  const options = formatReq("POST", envoiPost);

  fetch(url, options)
    .then((res) => res.json())

    .then((res) => {
      let texte = "";
      console.log(res);
      console.log(res.header);
      for (let index = 0; index < 1 * res.length; index++) {
        texte += res[index].name + "<br>";
      }
      document.getElementById("infoSauces").innerHTML = texte;
      // const innerRep = document.getElementById("idTestPass");
    })
    .catch(function (error) {
      alert(error);
    });
}
function affichepipo() {
  const fruits = ["Orange", "Apple", "Mango", "Kiwi"];

  const filterFunction2 = (fruit) => {
    return fruit !== "Mango";
  };
  const filterFunction3 = (fruit) => {
    if (fruit !== "Mango") {
      return true;
    } else {
      return false;
    }
  };
  const filterFunction = (fruit) => {
    //console.log(indexOf(fruit));
    /* if (fruit.findIndex !== 2) {
      return true;
    } else {
      return false;
    } */
  };

  const filterFunctionIndex = (fruit) => {
    return fruit.findIndex !== 2;
  };
  const fruitsWithoutMango = fruits.filter(filterFunction);
  const fruitsWithout_2 = fruits.filter(filterFunctionIndex);
  /* console.log(
    "kiwi ",
    fruits.findIndex((fruit) => fruit === "Kiwi")
  ); */

  console.log("fruit index", fruitsWithout_2);
  console.log("fruit : ", fruitsWithoutMango);

  //app.get("/api/pipo/t1
  let url = "http://localhost:3000/api/pipo/t1";
  fetch(url, { method: "GET" })
    .then((res) => res.json())

    .then((res) => {
      console.log(res);
      // res.status(200).json(users2);
      // next();
    })
    .catch((error) => {
      console.log("erreur");
    });
}
function affichepipo2() {
  //app.get("/api/pipo/t1
  let url = "http://localhost:3000/api/pipo/t2";
  fetch(url, { method: "GET" })
    .then((res) => res.json())

    .then((res) => {
      console.log(res);
      // res.status(200).json(users2);
      // next();
    })
    .catch((error) => {
      console.log("erreur");
    });
}
function affichepipo3() {
  //app.get("/api/pipo/t1
  let url = "http://localhost:3000/api/pipo/t3";
  fetch(url, { method: "GET" })
    .then((res) => res.json())

    .then((res) => {
      console.log(res);
      // res.status(200).json(users2);
      // next();
    })
    .catch((error) => {
      console.log("erreur");
    });
}
function affichepipopipo() {
  //app.get("/api/pipo/t1
  let url = "http://localhost:3000/api/pipo/pipo";
  fetch(url, { method: "GET" })
    .then((res) => res.json())

    .then((res) => {
      console.log(res);
      // res.status(200).json(users2);
      // next();
    })
    .catch((error) => {
      console.log("erreur");
    });
}

/**_______________________________________________________________________________________________
 * ________________________________________________________________________________________________
 _______________________________________________________________________________________________
 * ________________________________________________________________________________________________
 _______________________________________________________________________________________________
 * ________________________________________________________________________________________________
 _______________________________________________________________________________________________
 * ________________________________________________________________________________________________
 _______________________________________________________________________________________________
 * ________________________________________________________________________________________________
 _______________________________________________________________________________________________
 * ________________________________________________________________________________________________
 _______________________________________________________________________________________________
 * ________________________________________________________________________________________________
 */

function leLogin(type) {
  event.preventDefault();
  // file:///C:/Users/bruno/Documents/p6_2022/my_front/3000/api/auth/login.

  let url = "http://localhost:3000/api/auth/login";
  if (type == 1) {
    url = "http://localhost:3000/api/auth/signup";
  }

  const leMail = document.getElementById("email").value;
  const lePsw = document.getElementById("psw").value;
  //console.log(leMail + " : " + lePsw);
  const envoiPost = { email: leMail, password: lePsw };

  const options = formatReq("POST", envoiPost);

  fetch(url, options)
    .then((res) => res.json())

    .then((res) => {
      //console.log("in boucle");
      console.log(res);
      //console.log("uuuu"); //res["userId"]);
      editSauce(res);

      /*  if (userId) {
        document.getElementById("lesSauces").style.display = "block";
      } */
    })
    .catch(function (error) {
      alert(error);
    });
}
function testPassword() {
  event.preventDefault();
  const valeur = document.getElementById("testPass").value;
  // console.log(valeur);
  const url = "http://localhost:3000/api/auth/testPwd";
  const options = formatReq("POST", { test: valeur });
  fetch(url, options)
    .then((res) => res.json())

    .then((res) => {
      const innerRep = document.getElementById("idTestPass");
      if (res["testGod"]) {
        console.log(`votre saisie ${res["testGod"]} est ok`);

        innerRep.innerHTML = `votre saisie ${res["testGod"]} est ok`;
        innerRep.style.backgroundColor = "green";
      } else {
        innerRep.innerHTML = "votre saisie : " + res["testBad"] + " est fausse";
        innerRep.style.backgroundColor = "red";
      }
    })
    .catch(function (error) {
      alert(error);
    });
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

function logExemple(userTxt) {
  const user = userTxt.split(",@,");
  //console.log(`hello :  ${user[0]} , pass _:   ${user[1]} `);
  const envoiPost = { email: user[0], password: user[1] };
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
let leUserId = "";
let leToken = "";

function editSauce(res) {
  //console.log(res.userId);
  if (res.userId) {
    localStorage.setItem("token", res.token);
    localStorage.setItem("userId", res.userId);
    leToken = res.token;
    leUserId = res.userId;
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
/* function allUser() {
   fetch(url)
  let url = "http://localhost:3000/api/auth";
   fetch(url, { method: "GET" })
 
    .then((res) => res.json())

    .then((res) => {
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    });
} */

/*  function leTest(){
        event.preventDefault();
        const envoiPost = {
             titi: "tito",
            email: "truc@free.fr",
            psw: "1234",};

    const options = {
    body: JSON.stringify(envoiPost),
    headers: {
      "Content-Type": "application/json",
    },}

     let url="http://localhost:3000/api/auth/leTest";
    } */
