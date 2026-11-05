import { authClient } from "./auth-client";

const BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors || {};
  }
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";

  if (auth) {
    const { data } = await authClient.token();
    if (!data?.token) throw new ApiError("Your session has expired. Please sign in again.", 401);
    headers.Authorization = `Bearer ${data.token}`;
  }

  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    const isLocalBackendInProd =
      typeof window !== "undefined" && window.location.protocol === "https:" && BASE.includes("localhost");
    if (isLocalBackendInProd) {
      console.error(
        "[API Error] Your live Vercel site is trying to reach http://localhost:5000. Please deploy your backend server and set NEXT_PUBLIC_API_URL in your Vercel Environment Variables to your live backend URL."
      );
    }
    throw new ApiError(
      isLocalBackendInProd
        ? "Could not reach the backend server. Please configure NEXT_PUBLIC_API_URL on Vercel with your live backend server URL."
        : "Could not reach the server. Make sure the backend server is running on port 5000.",
      0
    );
  }

  const json = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(json?.message || "Something went wrong. Please try again.", res.status, json?.errors);
  return json;
}

export const api = {
  listEvents: ({ limit, search, type } = {}) => {
    const params = new URLSearchParams();
    if (limit) params.set("limit", limit);
    if (search) params.set("search", search);
    if (type) params.set("type", type);
    const query = params.toString();
    return request(`/events${query ? `?${query}` : ""}`);
  },
  getEvent: (id) => request(`/events/${id}`),
  createEvent: (body) => request("/events", { method: "POST", body, auth: true }),
  updateEvent: (id, body) => request(`/events/${id}`, { method: "PUT", body, auth: true }),
  deleteEvent: (id) => request(`/events/${id}`, { method: "DELETE", auth: true }),
  myEvents: () => request("/my-events", { auth: true }),
  joinEvent: (id) => request(`/events/${id}/join`, { method: "POST", auth: true }),
  leaveEvent: (id) => request(`/events/${id}/join`, { method: "DELETE", auth: true }),
  membership: (id) => request(`/events/${id}/membership`, { auth: true }),
  joinedEvents: () => request("/joined", { auth: true }),
};
