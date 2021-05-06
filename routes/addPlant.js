const template = require("../template");
const model = require("../database/model.js");
const db = require("../database/connections");

function addPlants() {
    return `
    <h1>Add your plant</h1>
    <form action="/addPlant" method="POST">
    
    <div>
     <label for="plant_type">What is your plant type!</label>
     <input type="text" id="plant_type" name="plant_type">
     <label for="plant_content">Don't leaf it out tell us whats your plant</label>
     <input type="text" id="plant_content" name="plant_content">
   </div>
   <button type="submit">Submit Plant</button>
   </form>
   <a href="/home">Bank to homepage to see all plants</a>
     `;
}


//Display all plants 
function displayPlants() {
    return db.query("SELECT * FROM plants").then((result) => {
        const plants = result.rows;
        const plant_info = plants
        .map((plants) => `
        <div>
        <span>${plants.plant_type}</span>
        <p>${plants.plant_content}</p>    
        <form action="/delete-post" method="POST" style="display: inline;">
        <button name="id" value="${plant.id}" aria-label="Delete post">
          Delete
        </button>
      </form>
      </div>`
        )
        .join("");
        return `
        <section>
        ${plant_info}
        <section>
        `;
      });
}


function get(request, response) {
    displayPlants().then((post) => {
      const html = template(`landing`, htmlPostForm() + post);
      response.send(html);
    });
  }

module.exports = { get };