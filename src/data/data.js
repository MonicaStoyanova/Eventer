import { del, get, post, put } from "./api.js";

export const getAll = async () => get("/data/events?sortBy=_createdOn%20desc");

export const getById = async (id) => get(`/data/events/${id}`);

export const deleteById = async (id) => del(`/data/events/${id}`);

export const create = async (data) => {
  const result = await post("/data/events", data);
  return result;
};

export const editById = async (id, data) => {
  const result = await put(`/data/events/${id}`, data);
  return result;
};
