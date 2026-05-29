import { api } from "./api";

export function fetchWordsData() {
  return api.get("/bw/databw");
}

export function pingBDD() {
  return api.get("/db/pingBDD");
}
