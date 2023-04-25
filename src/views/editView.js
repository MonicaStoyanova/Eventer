import { getById } from "../data/data.js";
import { html, page } from "../utils/lib.js";
import { submitHandler } from "../utils/submitHandler.js";
import { editById } from "../data/data.js";

const editTemplate = (event, submitHandler) => html`<section id="edit">
  <div class="form">
    <h2>Edit Event</h2>
    <form @submit=${submitHandler} class="edit-form">
      <input type="text" name="name" id="name" placeholder=${event.name} />
      <input
        type="text"
        name="imageUrl"
        id="event-image"
        placeholder=${event.imageUrl}
      />
      <input
        type="text"
        name="category"
        id="event-category"
        placeholder=${event.category}
      />

      <textarea
        id="event-description"
        name="description"
        placeholder=${event.description}
        rows="5"
        cols="50"
      ></textarea>

      <label for="date-and-time">Event Time:</label>
      <input type="text" name="date" id="date" placeholder=${event.date} />

      <button type="submit">Edit</button>
    </form>
  </div>
</section>`;

export const editView = (ctx) => {
  const id = ctx.params.id;

  const updateEvent = async ({
    name,
    imageUrl,
    category,
    description,
    date,
  }) => {
    if (
      name === "" ||
      imageUrl === "" ||
      category === "" ||
      description === "" ||
      date === ""
    ) {
      return alert("All fields are required");
    }
    const data = {
      name,
      imageUrl,
      category,
      description,
      date,
    };
    await editById(id, data);
    page.redirect("/events");
  };

  const getEvents = async () => {
    const event = await getById(id);

    ctx.render(editTemplate(event, submitHandler(updateEvent)));
  };
  getEvents();
};
