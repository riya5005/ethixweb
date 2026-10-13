import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { leadsCollection } from "@/lib/mongodb";
// Auth is enforced by middleware.js before any of these run.
const fail = () => NextResponse.json({ error: "Database error" }, { status: 500 });

export async function GET() {
  try {
    const docs = await (await leadsCollection()).find().sort({ created_at: -1 }).toArray();
    // Mongo uses _id (an ObjectId). The admin page expects a plain string "id".
    return NextResponse.json({ leads: docs.map(({ _id, ...rest }) => ({ ...rest, id: _id.toString() })) });
  } catch { return fail(); }
}
export async function PATCH(req) {
  try {
    const { id, status } = await req.json();
    if (!["new", "contacted", "won", "lost"].includes(status)) return NextResponse.json({ error: "Bad status" }, { status: 400 });
    await (await leadsCollection()).updateOne({ _id: new ObjectId(id) }, { $set: { status } });
    return NextResponse.json({ ok: true });
  } catch { return fail(); }
}
export async function DELETE(req) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    await (await leadsCollection()).deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch { return fail(); }
}
