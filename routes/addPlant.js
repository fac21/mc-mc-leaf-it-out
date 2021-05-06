const template = require("../template");
const model = require("../database/model.js");
const db = require("../database/connection");

function addPlants() {
    return `
    <h1>Add your plant</h1>
    <form action="/add-plant" method="POST">
    
    <div>
     <label for="plant_type">What is your plant type!</label>
     <input type="text" id="plant_type" name="plant_type">
     <label for="plant_content">Don't leaf it out tell us whats your plant</label>
     <input type="text" id="plant_content" name="plant_content">
     <!--
     <label for="img_url"> upload picture </label>
     <input type="file" name="img_url">
     -->
     <label for="img_url"> img_url </label>
     <input type="text" name="img_url">

     
   </div>
   <button type="submit">Submit Plant</button>
   </form>
   <a href="/home">Bank to homepage to see all plants</a>
     `;
}


//Display all plants 
// function displayPlants() {
//     return db.query("SELECT * FROM plants").then((result) => {
//         const plants = result.rows;
//         const plant_info = plants
//         .map((plants) => `
//         <div>
//         <span>${plants.plant_type}</span>
//         <p>${plants.plant_content}</p>    
//         <form action="/delete-post" method="POST" style="display: inline;">
//         <button name="id" value="${plants.id}" aria-label="Delete post">
//           Delete
//         </button>
//       </form>
//       </div>`
//         )
//         .join("");
//         return `
//         <section>
//         ${plant_info}
//         <section>
//         `;
//       });
// }


function get(request, response) {
    // displayPlants().then((post) => {
      const html = template.getHtmlTemp(`addPlant`, addPlants());
      response.send(html);
    // });
  }


  function post(request, response) {
    const { plant_type, plant_content, img_url  } = request.body;
    const sid = request.signedCookies.sid;
    console.log(sid)
    if (sid) {
      model
        .getUserSessionData(sid)
        .then((result) => {
          const user_id = result.data.user.id;
  console.log("string3")
          return model.createPlant( plant_type,  plant_content, img_url );
        })
        .then(response.redirect("/add-plant"));
    }
  
    // response.redirect("/addPlant");
  }

module.exports = { get, post };
