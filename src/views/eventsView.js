import { getAll } from "../data/data.js";
import { html } from "../utils/lib.js";

const eventsTemplate = (data) => html`<!-- Dashboard page -->
  <h2>Current Events</h2>

  ${data.length === 0
    ? html` <!-- Display an h4 if there are no posts -->
        <h4>No Events yet.</h4>`
    : html` <section id="dashboard">
        <!-- Display a div with information about every post (if any)-->
        ${data.map(
          (event) => html` <div class="event">
            <img src=${event.imageUrl} alt="example1" />
            <p class="title">${event.title}</p>
            <p class="date">${event.date}</p>
            <a class="details-btn" href="${`/details/${event._id}`}">Details</a>
          </div>`
        )}
      </section>`} `;

export const eventsView = (ctx) => {
  const getEvents = async () => {
    const events = await getAll();
    console.log(events);
    ctx.render(eventsTemplate(events));
  };
  getEvents();
};
