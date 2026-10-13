import { NextResponse } from "next/server";
import { adminToken } from "@/lib/auth";

export async function POST(req) {
  const { password } = await req.json().catch(() => ({}));
  if (!password || password !== process.env.ADMIN_PASSWORD)
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin", await adminToken(), { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 60 * 60 * 8 });
  return res;
}
export async function DELETE() { // logout
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin");
  return res;
}
