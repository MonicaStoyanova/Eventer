import { deleteById, getById } from "../api/data.js";
import { goToEvent, totalGoing, getSpecificUser } from "../api/going.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (
  ev,
  go,
  hasUser,
  whoCanGo,
  isOwner,
  onDelete,
  onGoing
) => html` <section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${ev.imageUrl} alt="example1" />
    <p id="details-title">${ev.name}</p>
    <p id="details-category">
      Category: <span id="categories">${ev.category}</span>
    </p>
    <p id="details-date">Date:<span id="date">${ev.date}</span></p>
    <div id="info-wrapper">
      <div id="details-description">
        <span>${ev.description}</span>
      </div>
    </div>

    <h3>Going: <span id="go">${go}</span> times.</h3>
  </div>
  ${evControls(ev, hasUser, whoCanGo, isOwner, onDelete, onGoing)}
</section>`;

function evControls(ev, hasUser, whoCanGo, isOwner, onDelete, onGoing) {
  if (hasUser == false) {
    return nothing;
  }
  if (whoCanGo) {
    return html` <div id="action-buttons">
      <a @click=${onGoing} href="javascript:void(0)" id="go-btn">Going</a>
    </div>`;
  }
  if (isOwner) {
    return html` <div id="action-buttons">
      <a href="/edit/${ev._id}" id="edit-btn">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
    </div>`;
  }
}

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const requests = [getById(id), totalGoing(id)];
  const hasUser = Boolean(ctx.user);
  if (hasUser) {
    requests.push(getSpecificUser(id, ctx.user._id));
  }

  const [ev, go, isGoing] = await Promise.all(requests);

  const isOwner = hasUser && ctx.user._id == ev._ownerId;
  const whoCanGo = !isOwner && isGoing == 0;
  ctx.render(
    detailsTemplate(ev, go, hasUser, whoCanGo, isOwner, onDelete, onGoing)
  );

  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this event?");

    if (choice) {
      await deleteById(id);
      ctx.page.redirect("/catalog");
    }
  }
  async function onGoing() {
    await goToEvent(id);
    ctx.page.redirect("/catalog/" + id);
  }
}
