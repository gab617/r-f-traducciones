const BASE_URL = import.meta.env.VITE_URL_API;

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  };

  const res = await fetch(url, config);

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || errorBody.error || `Error ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, body) => request(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: (endpoint, body) => request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
};

export const URL_BASE = BASE_URL;

export function normalizeImageUrl(url) {
  if (!url) return url;
  return url.replace(/^https?:\/\/localhost:\d+/, BASE_URL);
}
