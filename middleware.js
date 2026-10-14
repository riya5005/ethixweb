import { NextResponse } from "next/server";
import { adminToken } from "@/lib/auth";

// Runs before every /admin and /api/admin request.
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login" || pathname === "/api/admin/login") return NextResponse.next();
  const ok = req.cookies.get("admin")?.value === (await adminToken());
  if (ok) return NextResponse.next();
  if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.redirect(new URL("/admin/login", req.url));
}
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
