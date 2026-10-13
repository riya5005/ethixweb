"use client";
import { useState } from "react";
export default function Login() {
  const [err, setErr] = useState("");
  async function go(e) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", { method: "POST", body: JSON.stringify({ password: new FormData(e.target).get("password") }) });
    if (res.ok) window.location.href = "/admin"; else setErr("Wrong password. Try again.");
  }
  return (
    <form onSubmit={go} className="mx-auto mt-24 max-w-sm space-y-4 px-5">
      <h1 className="text-2xl font-bold">Admin login</h1>
      <input name="password" type="password" required placeholder="Password" className="w-full rounded-lg border px-3 py-2.5" />
      <button className="w-full rounded-full bg-brand py-3 font-semibold text-white">Log in</button>
      {err && <p className="text-brand">{err}</p>}
    </form>
  );
}
