import { decorateContext } from "./middlewares/decorateContext.js";

import { page, render } from "./utils/lib.js";
import { homeView } from "./views/homeView.js";
import { navView } from "./views/navView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import { eventsView } from "./views/eventsView.js";
import { createView } from "./views/createView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";

const main = document.getElementById("main-content");
export const renderMain = (content) => render(content, main);

console.log("App is running... ");

page(decorateContext);

navView();
const show = () => console.log("show");

page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/events", eventsView);
page("/details/:id", detailsView);
page("/edit/:id", editView);
page("/addevent", createView);

page.start();
