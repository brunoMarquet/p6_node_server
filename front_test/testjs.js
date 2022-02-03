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
  let imagePath = "C:\fakepathlogo.png";
  if (document.getElementById("imageUrl").value) {
    imagePath = document.getElementById("imageUrl").value;
  }
  console.log(imagePath);
}
///

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

function test1() {
  console.log("rrrrrrrr");
  event.preventDefault();
  // file:///C:/Users/bruno/Documents/p6_2022/my_front/3000/api/auth/login.

  let url = "http://localhost:3000/api/test1";

  const leMail = "toti" + Math.floor(Math.random() * 100) + 1 + "@gmail.com";
  const lePsw = 124 + Math.floor(Math.random() * 900);

  const envoiPost = { email: leMail, password: lePsw };

  const options = formatReq("POST", envoiPost);

  fetch(url, options)
    .then((res) => res.json())

    .then((res) => {
      //console.log("in boucle");
      console.log(res);
      //console.log("uuuu"); //res["userId"]);
      // editSauce(res);

      /*  if (userId) {
        document.getElementById("lesSauces").style.display = "block";
      } */
    })
    .catch(function (error) {
      alert(error);
    });
}
function test2() {
  console.log("rrrr2222rrrr");
  event.preventDefault();
  // file:///C:/Users/bruno/Documents/p6_2022/my_front/3000/api/auth/login.

  let url = "http://localhost:3000/api/test2";

  fetch(url, { method: "GET" })
    .then((res) => res.json())

    .then((res) => {
      console.log(res);
    })
    .catch(function (error) {
      alert(error);
    });
}
