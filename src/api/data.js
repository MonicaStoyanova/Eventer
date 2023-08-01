import { del, get, post, put } from "./api.js";

export async function getAll() {
  return get("/data/events?sortBy=_createdOn%20desc");
}

export async function getById(id) {
  return get("/data/events/" + id);
}

export async function deleteById(id) {
  return del("/data/events/" + id);
}

export async function createEvent(petData) {
  return post("/data/events", petData);
}

export async function editEvent(id, petData) {
  return put("/data/events/" + id, petData);
}
