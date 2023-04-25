import { deleteById, getById } from "../data/data.js";
import { html } from "../utils/lib.js";

const detailsTemplate = (
  event,
  user,
  isOwner,
  deleteHandler
) => html` <!--Details page-->
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${event.imageUrl} alt="example1" />
      <p id="details-title">${event.title}</p>
      <p id="details-category">
        Category: <span id="categories">${event.category}</span>
      </p>
      <p id="details-date">Date:<span id="date">${event.date}</span></p>
      <div id="info-wrapper">
        <div id="details-description">
          <span>${event.description}</span>
        </div>
      </div>

      <h3>Going: <span id="go">0</span> times.</h3>
      <!--Edit and Delete are only for creator-->
      ${isOwner
        ? html` <div id="action-buttons">
            <a href="/edit/${event._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${deleteHandler}
              >Delete</a
            >
          </div>`
        : ""}
    </div>
  </section>`;

export const detailsView = (ctx) => {
  const id = ctx.params.id;
  const user = ctx.user;
  let isOwner = false;

  const getEvent = async () => {
    const event = await getById(id);

    if (event._ownerId === user._id) {
      isOwner = true;
    }

    ctx.render(detailsTemplate(event, user, isOwner, deleteHandler));
  };
  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await deleteById(id);
      ctx.page.redirect("/events");
    }
  };
  getEvent();
};
