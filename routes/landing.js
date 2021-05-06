const template = require("../template");

function get(request, response) {
    const html = `
    <h1><img class="logo" src="../images/Leaf-it-out-logo.png" alt="plant-website-logo"</h1>
    <a href="/sign-up">Sign Up</a>
    <br>
    <a href="/log-in">Log In</a>
    `;
    response.send(template.getHtmlTemp('landing', html))
}

module.exports = { get }
