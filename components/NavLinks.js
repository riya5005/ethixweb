"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

export default function NavLinks({ links }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]); // close the menu whenever the page changes

  return (
    <nav className="flex items-center gap-7 text-sm font-medium">
      {links.map(([l, h]) => (
        <Link key={h} href={h} className={`hidden border-b-2 py-1 hover:text-brand sm:block ${path === h ? "border-brand" : "border-transparent"}`}>{l}</Link>
      ))}
      <Link href="/contact" className="hidden rounded-full bg-brand px-5 py-2.5 text-white shadow-sm transition hover:bg-deep active:scale-95 sm:block">Get a free quote</Link>
      <div className="relative sm:hidden">
        <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="rounded p-2"><Icon name="menu" /></button>
        {open && (
          <div className="absolute right-0 mt-2 w-52 rounded-xl border bg-white p-2 shadow-xl">
            {[...links, ["Get a free quote", "/contact"]].map(([l, h]) => <Link key={l} href={h} className="block rounded-lg px-4 py-3 hover:bg-soft">{l}</Link>)}
          </div>
        )}
      </div>
    </nav>
  );
}
