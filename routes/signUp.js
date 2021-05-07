const auth = require("../auth.js");
const template = require("../template.js");


function get(request, response) {
  const signupForm = `
        <h1>Sign up</h1>
        <form action="sign-up" method="POST">
          <label for="username">Name</label>
          <input type="text" id="username" name="username">
          <label for="email">Email</label>
          <input type="email" id="email" name="email">
          <label for="password">Password</label>
          <input type="password" id="password" name="password">
          <button type="submit">Sign up</button>
        </form>
      `;
      const header = `
      <header>
      <img src="leaf-it-out-logo.png" alt="Leaf it Out logo">
      <div class="header-text">
      <h1>Hi pal!</h1>
      <p>Looking to buy or sell your plants? Leaf it to us!</p>
      </div>
      </header>
      `
      const html = template.getHtmlTemp("Leaf it Out Sign Up", header, signupForm);
      response.send(html)
  }
  
  function post(request, response) {
    const { username, email, password } = request.body;
    console.log(username, email, password)
    auth
      .createUser(username, email, password)
      .then((user) => auth.saveUserSession(user))
      .then((sid) => {
        response.cookie("sid", sid, auth.COOKIE_OPTIONS);
        response.redirect("/home");
      });
  }
  
  module.exports = { get, post };
  