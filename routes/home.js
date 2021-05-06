const db = require("../database/connection.js");
const model = require("../database/model.js");
const html = require("../template.js");

function get(request, response) {
  const sid = request.signedCookies.sid;
  let userHTML;
//   if (sid) {
//     model.getSession(sid).then((session) => {
//       userHTML = `
//       <h1>Hello ${session.user.username}</h1>
//       <form action="/log-out" method="POST">
//         <button>Log out</button>
//       </form>
//       <h2>Write a Review!</h2>
//       <form action="post-review" method="POST">
//         <label for="parkname">Skate Park</label>
//         <input type="text" id="parkname" name="parkname" required>
//         <label for="location">Location</label>
//         <input type="text" id="location" name="location" required>
//         <label for="review">Enter Your Review</label>
//         <textarea id="review" name="review rows="4" cols="50" required></textarea>
//         <button type="submit">Submit</button>
//       </form> 
//     `;
//     });
//   } else {

//     userHTML = `<h1>Hello Skate Mate</h1>

//     <a href="/sign-up">Sign up</a>
//     <span> | </span>
//     <a href="/log-in">Log in</a>
//   `;
//   }
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
    //   const html = ``
    response.send(html.getHtmlTemp('Leaf it Out Homepage', plantList));
  });
}

module.exports = { get };
