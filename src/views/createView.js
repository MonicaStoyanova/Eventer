import { html } from "../utils/lib.js";
import { create } from "../data/data.js";
import { submitHandler } from "../utils/submitHandler.js";
import { page } from "../utils/lib.js";

const createTemplate = (submitHandler) => html`<section id="create">
  <div class="form">
    <h2>Add Event</h2>
    <form @submit=${submitHandler} class="create-form">
      <input type="text" name="name" id="name" placeholder="Event" />
      <input
        type="text"
        name="imageUrl"
        id="event-image"
        placeholder="Event Image URL"
      />
      <input
        type="text"
        name="category"
        id="event-category"
        placeholder="Category"
      />

      <textarea
        id="event-description"
        name="description"
        placeholder="Description"
        rows="5"
        cols="50"
      ></textarea>

      <input type="text" name="date" id="date" placeholder="When?" />

      <button type="submit">Add</button>
    </form>
  </div>
</section>`;

const onCreate = async ({ name, imageUrl, category, description, date }) => {
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
  await create(data);
  page.redirect("/events");
};

export const createView = (ctx) =>
  ctx.render(createTemplate(submitHandler(onCreate)));
