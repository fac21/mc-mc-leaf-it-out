const express = require("express");
const server = express();
const staticHandler = express.static("public");

const cookieParser = require("cookie-parser");
const homepage = require("./routes/home.js");
const logIn = require("./routes/logIn.js");
const signUp = require("./routes/signUp.js");
const landing = require("./routes/landing.js");
const bodyParser = express.urlencoded({ extended: false });

server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(staticHandler);






const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });