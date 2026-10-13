"use client";
import { useEffect, useState } from "react";

export default function Admin() {
  const [leads, setLeads] = useState(null);
  const load = async () => setLeads((await (await fetch("/api/admin/leads")).json()).leads || []);
  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => { await fetch("/api/admin/leads", { method: "PATCH", body: JSON.stringify({ id, status }) }); load(); };
  const remove = async (id) => { if (confirm("Delete this lead?")) { await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" }); load(); } };
  const logout = async () => { await fetch("/api/admin/login", { method: "DELETE" }); window.location.href = "/admin/login"; };

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Leads {leads && `(${leads.length})`}</h1>
        <button onClick={logout} className="text-sm underline">Log out</button>
      </div>
      {!leads ? <p className="mt-6">Loading...</p> : leads.length === 0 ? <p className="mt-6 text-gray-500">No enquiries yet. They will appear here.</p> : (
        <div className="mt-6 space-y-3">
          {leads.map((l) => (
            <div key={l.id} className="rounded-xl border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{l.name} <span className="font-normal text-gray-500">· {l.service}</span></p>
                <div className="flex gap-2">
                  <select value={l.status} onChange={(e) => setStatus(l.id, e.target.value)} className="rounded border px-2 py-1 text-sm">
                    {["new", "contacted", "won", "lost"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <button onClick={() => remove(l.id)} className="text-sm text-brand">Delete</button>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-600">{l.email} {l.phone && `· ${l.phone}`} · {new Date(l.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
              <p className="mt-2">{l.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
