const db = require("../database/connection.js");
const model = require("../database/model.js");
const html = require("../template.js");

function get(request, response) {
  const sid = request.signedCookies.sid;
  let header;

//   CRAIG PLEASE DELETE 
   if (sid) {
    model.getSession(sid).then((session) => {
  header = `
  <header>
  <img src="leaf-it-out-logo.png" alt="Leaf it Out logo">
  <div class="header-text">
  <h1>Hi there, ${session.user.username}</h1>
  <p>Looking to buy or sell your plants? Leaf it to us!</p>
  </div>
  </header>
  `
    });
  } else {
    header = `
      <header>
  <img src="leaf-it-out-logo.png">
  <div class="header-text">
  <h1>Hi there, username</h1>
  <p>Looking to buy or sell your plants? Leaf it to us!</p>
  </div>
  </header>
  `;
  }

  db.query(
    "SELECT plants.plant_type, plants.plant_content, plants.img_url, users.username FROM plants INNER JOIN users ON plants.user_id = users.id"
  ).then((result) => {
    const plants = result.rows; // an array of obecjts, where each object is a row from database (parkname, review content etc)
    const plantList = plants
      .map((plant) => {
        return `
        <li>
        <h2>${plant.plant_type}</h2>
        <img src="${plant.img_url}">
        <p class="plant-content">"${plant.plant_content}"</p>
        <p>- ${plant.username}</p>
         <form action="/delete-post" method="POST" style="display: inline;">
         <button name="id" value="${plants.id}" aria-label="Delete post">
        Delete
         </button>
       </form>
        </li>
      `;
      })
      .join("");

    response.send(html.getHtmlTemp('Leaf it Out Homepage', header, plantList));
  });
}


function deletePlant(request, response) {
    console.log(request.body);
    const plantId = request.body.id;
    const sid = request.signedCookies.sid;

    if(sid){
        const userData = model.getUserSessionData(sid);
        const postData = model.getPostByID(plantId);

        Promise.all([userData, postData]).then((values) => {
            const userId = values[0].data.user.id;
            const postUserId = values[1].rows[0].user_id;

            if (userId === postUserId) {
                return model.deletePlant(postId).then(() => {
                    response.redirect("/home");
                });    
            } else {
                response.redirect("/home");
            }
        });
    } else {
        response.redirect("/home");
    }
}

module.exports = { get, deletePlant };
