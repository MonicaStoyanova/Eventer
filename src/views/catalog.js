import { getAll } from "../api/data.js";
import { html } from "../lib.js";

const catalogTemplate = (events) => html` <h2>Current Events</h2>
  <section id="dashboard">
    ${events.length == 0
      ? html` <h4>No Events yet.</h4> `
      : events.map(eventsCardTemplate)}
  </section>`;

const eventsCardTemplate = (ev) => html` <div class="event">
  <img src=${ev.imageUrl} alt="example1" />
  <p class="title">${ev.name}</p>
  <p class="date">${ev.date}</p>
  <a class="details-btn" href="/catalog/${ev._id}">Details</a>
</div>`;

export async function showCatalog(ctx) {
  const events = await getAll();
  ctx.render(catalogTemplate(events));
}
