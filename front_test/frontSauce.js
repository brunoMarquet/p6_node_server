//const { truncate } = require("fs");
// connerie

initProduit();

function initProduit() {
  const urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get("id");

  //console.log(" lien id 23 : ", product_id);

  //"/api/sauces2:id"
  let url = "http://localhost:3000/api/sauces/" + product_id;
  //ok : sauce/61f8159150018159299dc487
  //return;
  // url = "http://localhost:3000/api/sauces/61f801e4ef1ccf7a58ac2f0e";
  //console.log(" url : ", url);

  leToken = localStorage.getItem("token");
  //console.log("get_ 1 Sauce _:_ ", leToken);
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
      //document.getElementById("nav_bton").style.display = "block";
      //console.log(prod);
      // startDownload();
      localStorage.setItem("sauceId", prod._id);

      let tt = "";

      const userID = localStorage.getItem("userId");
      //console.log(userID, " = ", prod.userId);
      // pas la logique top
      let lelike = '<i class="far fa-thumbs-up" onclick="jaime(1)"></i>';
      let lelikePas =
        '<i class="far fa-thumbs-down" onclick="jaimePas(-1)"></i>';

      if (prod.usersLiked.indexOf(userID) !== -1) {
        console.log(" user_aime");
        lelike = '<i class="fas fa-thumbs-up" onclick="jaime(0)"></i>';
      }
      if (prod.usersDisliked.indexOf(userID) !== -1) {
        console.log(" user_n_aime_pas");
        lelikePas = '<i class="fas fa-thumbs-down"  onclick="jaimePas(0)"></i>';
      }

      tt = ` <img src=" ${prod.imageUrl} " alt="Grapefruits">
     
      <br><h1>${prod.name} ,src : ${prod.imageUrl} </h1> by : ${prod.manufacturer}  <br><h2>description :</h2> ${prod.description}<hr>${prod._id}<hr>
     like ; ${lelike} ${prod.likes}
     dislike ; ${lelikePas} ${prod.dislikes}
     `;

      if (userID === prod.userId) {
        console.log(" user_verif");
        //document.getElementById("nav_bton").style.display = "block";
        document.getElementById("nav_bton").innerHTML = `
        <button class="effacer" onclick="effacer()">delete</button>
        <button class="modif" onclick="modifier()">modifier</button>

       

        `;
      }

      //document.getElementById("laSauce").innerHTML = tt;
      //console.log(tt);

      document.getElementById("laSauce").innerHTML = tt;
      // afficheProd(product);
    })
    .catch(function (error) {
      console.log(error);
      //  edit_erreur(error);
    });
}
function startDownload() {
  return;
  let imageURL = " http://localhost:3000/images/kanap07.jpeg";
  imageURL = " http://localhost:3000/images/tata2.jpg";
  //imageURL = "sauce.jpeg";

  downloadedImg = new Image();
  downloadedImg.crossOrigin = "Anonymous";
  downloadedImg.addEventListener("load", imageReceived, false);
  downloadedImg.src = imageURL;
}
