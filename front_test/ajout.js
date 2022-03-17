let imgSrc = "";
let product_Id = "";
initAjout();

function initAjout() {
  leUser = localStorage.getItem("userId");
  // console.log(" modifffff888888888 ");
  if (leUser) {
    document.getElementById("userId").value = leUser;
  } else {
    logOut();
  }

  const urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get("id");
  /**ici product_id == 0: simple pas top!
   *  ""== 0" égalite simpls sinon bugh...  */
  if (product_id == 0) {
    // alert("modif");
    titre = "PAS ACTIF ! : Ajouter une sauce";
    document.getElementById("bouton11").innerHTML = "";
  } else {
    titre = "Modifier une sauce";
    let url = "http://localhost:3000/api/sauces/" + product_id;
    product_Id = product_id;

    leToken = localStorage.getItem("token");

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${leToken}`,
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((prod) => {
        // let tt = "";

        //  const userID = localStorage.getItem("userId");
        //const tt2 = "Id user :" + userID;

        ecrireSauce(prod);
      })
      .catch(function (error) {
        console.log(error);
        //  edit_erreur(error);
      });
  }
  document.getElementById("titre").innerHTML = titre;
}

function ajoutBase() {
  console.log("ajout");
  addSauce();
}

function ecrireSauce(laSauce) {
  const listProp = [
    "userId",
    "name",
    "manufacturer",
    "description",
    "mainPepper",
    //"imageUrl",
    "heat",
  ];
  for (let key in listProp) {
    const laKey = listProp[key];
    document.getElementById(laKey).value = laSauce[laKey];
    //laSauce[laKey] = valeur;
    //if (valeur){}
    //  console.log();
  }
  imgSrc = laSauce.imageUrl;
  console.log(imgSrc);
  document.getElementById("miniature").innerHTML = `<img src='${imgSrc}'>`;
  actuHeat(laSauce.heat);
}
function addSauce() {
  const list = [
    "userId",
    "name",
    "manufacturer",
    "description",
    "mainPepper",
    // "imageUrl",
    "heat",
  ];

  let laSauce = {};
  for (let key in list) {
    const laKey = list[key];
    const valeur = document.getElementById(laKey).value;
    laSauce[laKey] = valeur;
  }

  laSauce.imageUrl = imgSrc;

  console.log(laSauce);
  // return;

  //const envoiPost = { email: mail, password: psw };
  // const options = formatReq("POST", laSauce);
  //const options = formatReq("POST", envoiPost);

  //app.put("/api/saucesTest/:id"
  let url = `http://localhost:3000/api/saucesTest/${product_Id}`;
  let leToken = localStorage.getItem("token");

  const Unmessage = {
    method: "PUT",
    body: JSON.stringify(laSauce),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${leToken}`,
    },
  };
  fetch(url, Unmessage)
    .then((res) => res.json())

    .then((res) => {
      console.log(res);
      window.location = "listSauce.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

/** //let imagePath = "C:\fake_pathlogo.png";
  /*  if (document.getElementById("imageUrl").value) {
    imagePath = document.getElementById("imageUrl").value;
  }
  console.log(imagePath);
 * function affichMiniature(image) {
  //connerie
  var path = "C:\\fakepath\\example.doc";
  var filename = path.replace(/^.*\\/, "");
  console.log(filename);

  document.getElementById("miniature").innerHTML = `<img src='${image.value}'>`;
}
function ajoutTruc() {
  const list = {
    userId: 555555,
    name: "t5666",
    manufacturer: "t5666mmmmmmmmmm",
    description: "t5666uuuuuuuuuuuu",
    mainPepper: "t56mmmmmmmmmmmm66",
    imageUrl: " iiiit5666",
    heat: 8,
  };
}
 */
