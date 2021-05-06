const db = require("../database/connection.js");
const model = require("../database/model.js");
const html = require("../template.js");

function get(request, response) {
  const sid = request.signedCookies.sid;
  let userHTML;
  if (sid) {
    model.getSession(sid).then((session) => {
      userHTML = `
      <h1>Hello ${session.user.username}</h1>
      <form action="/log-out" method="POST">
        <button>Log out</button>
      </form>
      <h2>Write a Review!</h2>
      <form action="post-review" method="POST">
        <label for="parkname">Skate Park</label>
        <input type="text" id="parkname" name="parkname" required>
        <label for="location">Location</label>
        <input type="text" id="location" name="location" required>
        <label for="review">Enter Your Review</label>
        <textarea id="review" name="review rows="4" cols="50" required></textarea>
        <button type="submit">Submit</button>
      </form> 
    `;
    });
  } else {

    userHTML = `<h1>Hello Skate Mate</h1>

    <a href="/sign-up">Sign up</a>
    <span> | </span>
    <a href="/log-in">Log in</a>
  `;
  }
  //const reviewList = model.getReviews();
  //console.log(reviewList);
  db.query(
    "SELECT reviews.park_name, reviews.park_location, reviews.review_content, users.username FROM reviews INNER JOIN users ON reviews.user_id = users.id"
  ).then((result) => {
    //console.log(result);
    const reviews = result.rows; // an array of obecjts, where each object is a row from database (parkname, review content etc)
    const reviewList = reviews
      .map((review) => {
        return `
        <li>
        <h2>${review.park_name}, ${review.park_location}</h2>
        <p>"${review.review_content}"</p>
        <p>Reviewed by: ${review.username}</p>
        </li>
      `;
      })
      .join("");
    response.send(html.getHtmlTemp('homepage', userHTML));
  });
}

module.exports = { get };
