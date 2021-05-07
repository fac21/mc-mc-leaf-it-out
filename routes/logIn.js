const auth = require("../auth.js");
const template = require("../template.js");

function get(request, response) {
    const loginForm = `
    <h1>Log in</h1>
    <form action="log-in" method="POST">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button type="submit">Log in</button>
    </form>
    `;
    const header = `
    <header>
    <img src="leaf-it-out-logo.png" alt="Leaf it Out logo">
    <div class="header-text">
    <h1>Who are yew again?</h1>
    <p>Looking to buy or sell your plants? Leaf it to us!</p>
    </div>
    </header>
    `
    const html = template.getHtmlTemp("Leaf it Out Login", header, loginForm);
    response.send(html);
}

function post(request, response) {
    const { email, password } = request.body;
    auth
        .verifyUser(email, password)
        .then(auth.saveUserSession)
        .then((sid) => {
            response.cookie("sid", sid, auth.COOKIE_OPTIONS);
            response.redirect("/home");
        })
        .catch((error) => {
            console.error("error", error);
            response.send(`<h1>User doesn't exist</h1>`);
        });
}

module.exports = { 
    get, 
    post 
};