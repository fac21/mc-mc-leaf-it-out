const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const model = require("./database/model");

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: "strict",
  signed: true,
};

function createUser(username, email, password) {
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(username, email, hash));
}

function saveUserSession(user) {
  const randSID = crypto.randomBytes(18).toString("base64");
  return model.createSession(randSID, { user });
}

function verifyUser(email, password) {
  return model.getUser(email)
  .then((user) => {
    return bcrypt.compare(password, user.password)
    .then((match) => {
      if(!match) {
        throw new Error("Not a match, you numpty!");
      } else {
        delete user.password;
        return user;
      }
    })
  })
}

module.exports = { 
    COOKIE_OPTIONS, 
    createUser, 
    saveUserSession,
    verifyUser 
};
