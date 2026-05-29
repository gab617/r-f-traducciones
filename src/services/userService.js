import { api } from "./api";

export function fetchUsers() {
  return api.get("/db/users-data");
}

export function uploadPoints(userData, points, rachaSession) {
  return api.put("/db/upl-points", { userData, newPunt: points, rachaSession });
}
