const template = require("../template");

function get(request, response) {
    const html = `
    <h1><img class="logo" src="Leaf-it-out-logo.png" alt="plant-website-logo" alt="Leaf it Out logo"</h1>
    <a href="/sign-up">Sign Up</a>
    <br>
    <a href="/log-in">Log In</a>
    `;
    const header = ""
    response.send(template.getHtmlTemp('landing', header, html))
}

module.exports = { get }
