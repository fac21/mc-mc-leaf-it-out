const db = require("./connection.js");

function createUser(username, email, hash) {
  const INSERT_USER = `
  INSERT INTO users (username, email, password) VALUES ($1, $2, $3)
  RETURNING id, email, username
  `;
  return db
    .query(INSERT_USER, [username, email, hash])
    .then((result) => result.rows[0]);
}

function getImage(id) {
  return init.then(db => db.get("SELECT img FROM plants WHERE plant_id=?", plant_id));
}

function createPlant( plant_type, plant_content, img_url) {
  console.log("string")
  const INSERT_PLANT = `
    INSERT INTO plants ( plant_type, plant_content, img_url, created_at) VALUES
  ($1, $2, $3,  (SELECT CURRENT_TIMESTAMP));
    `;
  return db.query( INSERT_PLANT, [ plant_type, plant_content, img_url]);
}


function createSession(sid, dataObj) {
  const INSERT_SESSION = `INSERT INTO sessions (sid, data) VALUES ($1, $2) RETURNING sid;`;
  return db
    .query(INSERT_SESSION, [sid, dataObj])
    .then((result) => result.rows[0].sid);
}

function getUserSessionData(sid) {
  const SELECT_SESSION_DATA = `
        SELECT data FROM sessions WHERE sid = $1;
    `;
  return db.query(SELECT_SESSION_DATA, [sid]).then((result) => result.rows[0]);
}



// function deleteSession(sid) {
//   const DELETE_SESSION = `DELETE FROM sessions WHERE sid=$1`;
//   return db
//     .query(DELETE_SESSION, [sid]);
// }

function getSession(sid) {
  const SELECT_SESSION = "SELECT data FROM sessions WHERE sid=$1";
  return db.query(SELECT_SESSION, [sid]).then((result) => {
    const singleResult = result.rows[0];
    return singleResult && singleResult.data;
  });
}


function getUser(email) {
  const selectUser = `
  SELECT id, username, email, password FROM users WHERE email=$1;`;
  return db.query(selectUser, [email])
  .then((result) => {
    return result.rows[0];
  })
}

// function getReviews() {
//   return db
//     .query(
//       "SELECT reviews.park_name, reviews.park_location, reviews.review_content, users.username FROM reviews INNER JOIN users ON reviews.user_id = users.id"
//     )
//     .then((result) => {
//       const reviews = result.rows; // an array of objects, where each object is a row from database (parkname, review content etc)
//       let reviewList = "";
//       reviews.forEach((review) => {
//         reviewList += `
//       <h1>${review.park_name}</h1>
//       `;
//       });
//       return reviewList;
//     });
// }

// function getUser(reviewer) {
//   const USER_ID = "SELECT id FROM users WHERE username=$1";
//   //console.log(db.query(USER_ID, [reviewer]));
//   return db.query(USER_ID, [reviewer]);
// }

// function createReview(parkname, location, review, reviewer) {
//   //console.log(reviewer);
//   const INSERT_REVIEW = `INSERT INTO reviews (park_name, park_location, review_content, user_id) VALUES ($1, $2, $3, $4)
//   RETURNING review_content`;
//   return db.query(INSERT_REVIEW, [parkname, location, review, reviewer]);
// }

module.exports = {
  createUser,
  createSession,
  getSession,
//   getReviews,
  getUser,
  createPlant,
  getUserSessionData,
  getImage
//   createReview,
//   deleteSession
};
