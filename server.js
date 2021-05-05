const express = require("express");
const server = express();
const staticHandler = express.static("public");

//Middleware 
const cookieParser = require("cookie-parser");
const homepage = require("./routes/home.js");
const logIn = require("./routes/logIn.js");
const signUp = require("./routes/signUp.js");
const landing = require("./routes/landing.js");
const addPlant = require("./routes/addPlant");
const bodyParser = express.urlencoded({ extended: false });


//Processing for Session ID
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(staticHandler);


//Creating routes to see in browser
server.get("/addPlant", addPlant.get);
server.post("/addPlant", bodyParser, addPlant.post);


const PORT = process.env.PORT || 3000;

//Listening to Local Server 
server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});