import { renderMain } from '../app.js';
import getUserData from '../utils/getUserData.js';

export const decorateContext = (ctx, next) => {
  const user = getUserData();

  if (user) {
    ctx.user = user;
  }

  ctx.render = renderMain;
  next();
};
