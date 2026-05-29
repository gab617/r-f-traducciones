import { api } from "./api";

export function login(data) {
  return api.post("/db/login", data);
}

export function register(data) {
  return api.post("/db/register", data);
}
