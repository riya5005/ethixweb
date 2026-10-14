// The cookie value is a SHA-256 hash of password + secret.
// Without knowing both env vars, nobody can forge it.
export async function adminToken() {
  const data = new TextEncoder().encode(process.env.ADMIN_PASSWORD + process.env.ADMIN_SECRET);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
