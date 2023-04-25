import { html } from "../utils/lib.js";
import { register } from "../data/auth.js";
import { submitHandler } from "../utils/submitHandler.js";
import { page } from "../utils/lib.js";

const registerTemplate = (
  submitHandler
) => html`<!-- Register Page (Only for Guest users) -->
  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form @submit=${submitHandler} class="register-form">
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section> `;

const onRegister = async ({
  email,
  password,
  "re-password": confirmPassword,
}) => {
  if (email === "" || password === "" || confirmPassword === "") {
    return alert("All fields are required");
  }
  if (password !== confirmPassword) {
    return alert("Password don`t match");
  }

  await register(email, password, confirmPassword);
  page.redirect("/");
};

export const registerView = (ctx) =>
  ctx.render(registerTemplate(submitHandler(onRegister)));
