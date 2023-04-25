import { logout } from "../data/auth.js";
import { page } from "../utils/lib.js";

export const logoutHandler = () => {
  logout();
  page.redirect("/");
};
