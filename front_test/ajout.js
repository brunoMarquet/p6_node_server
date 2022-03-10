initAjout();

function initAjout() {
  leUser = localStorage.getItem("userId");
  if (leUser) {
    document.getElementById("userId").value = leUser;
  } else {
    logOut();
  }
  const urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get("id");
  if (product_id) {
    alert("modif");
  }
}
function affichMiniature(image) {
  console.log(image);
  document.getElementById("miniature").innerHTML = `<img src='${image.value}'>`;
}

function ajoutBase() {
  console.log("ajout");
  addSauce();
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
function addSauce() {
  const list = [
    "userId",
    "name",
    "manufacturer",
    "description",
    "mainPepper",
    "imageUrl",
    "heat",
  ];
  // const cpt = 0;
  let laSauce = {};
  for (let key in list) {
    const laKey = list[key];
    const valeur = document.getElementById(laKey).value;
    laSauce[laKey] = valeur;
    //if (valeur){}
    //  console.log();
  }
  if (laSauce.imageUrl == "") {
    laSauce.imageUrl = "titi.gif";
  }
  console.log(laSauce);

  //const envoiPost = { email: mail, password: psw };
  // const options = formatReq("POST", laSauce);
  //const options = formatReq("POST", envoiPost);
  let url = "http://localhost:3000/api/sauces2";

  url = "http://localhost:3000/api/saveImage";

  const Unmessage = {
    method: "POST",
    body: JSON.stringify(laSauce),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(url, Unmessage)
    .then((res) => res.json())

    .then((res) => {
      console.log(res);

      //editSauce(res);
    })
    .catch(function (error) {
      console.log(error);
    });

  //let imagePath = "C:\fake_pathlogo.png";
  /*  if (document.getElementById("imageUrl").value) {
    imagePath = document.getElementById("imageUrl").value;
  }
  console.log(imagePath); */
}
