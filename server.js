const express = require("express");
const server = express();
const staticHandler = express.static("public");

//Middleware 
const cookieParser = require("cookie-parser");
const logIn = require("./routes/logIn.js");
const signUp = require("./routes/signUp.js");
const landing = require("./routes/landing.js");
const home = require("./routes/home.js");
const addPlant = require("./routes/addPlant.js");
const bodyParser = express.urlencoded({ extended: false });


//Processing for Session ID
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(staticHandler);



server.get("/sign-up", signUp.get)
server.post("/sign-up", bodyParser, signUp.post);

server.get("/log-in", logIn.get)
server.post("/log-in", bodyParser, logIn.post);

//Creating routes to see in browser
server.get("/add-plant", addPlant.get);
server.post("/add-plant", bodyParser, addPlant.post);

server.get("/home", home.get)

server.get("/", landing.get)

const PORT = process.env.PORT || 3000;

//Listening to Local Server 
server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});