import { API_URL } from "../global/constants";

export async function login(username, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json; // { token, username }
}
