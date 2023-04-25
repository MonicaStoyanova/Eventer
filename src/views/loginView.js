import { html } from "../utils/lib.js";
import { submitHandler } from "../utils/submitHandler.js";
import { login } from "../data/auth.js";
import { page } from "../utils/lib.js";

const loginTemplate = (
  submitHandler
) => html` <!-- Login Page (Only for Guest users) -->
  <section id="login">
    <div class="form">
      <h2>Login</h2>
      <form @submit=${submitHandler} class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
  </section>`;

const onLogin = async ({ email, password }) => {
  if (email === "" || password === "") {
    alert("All fields are required");
  }

  await login(email, password);
  page.redirect("/");
};

export const loginView = (ctx) =>
  ctx.render(loginTemplate(submitHandler(onLogin)));
