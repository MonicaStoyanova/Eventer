import getUserData from "../utils/getUserData.js";
import { html, render } from "../utils/lib.js";

import { logoutHandler } from "../utils/logoutHandler.js";

const navTemplate = () => html` <!-- Navigation -->
  <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

  <nav>
    <div>
      <a href="/events">Events</a>
    </div>

    ${user
      ? html` <!-- Logged-in users -->
          <div class="user">
            <a href="/addevent">Add Event</a>
            <a href="/login" @click=${logoutHandler}>Logout</a>
          </div>`
      : html`
 <!-- Guest users -->
    <div class="guest">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>
  </nav>`}
  </nav>`;

const parent = document.querySelector("header");
const user = getUserData();

console.log(user);

export const navView = () => render(navTemplate(user), parent);
