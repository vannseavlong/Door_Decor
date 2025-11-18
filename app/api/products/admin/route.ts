import { NextResponse } from "next/server";
import { auth as adminAuth } from "@/lib/firebase/server";
import { isAllowedAdmin } from "@/lib/firebase/whitelist";
import { createProductServer } from "@/lib/firebase/firestore";
import { productSchema } from "@/lib/validators/productSchema";

export async function POST(req: Request) {
  try {
    const header = req.headers.get("authorization") || "";
    const token = header.replace("Bearer ", "");
    if (!token) return new Response("Unauthorized", { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    if (!decoded?.email || !isAllowedAdmin(decoded.email)) {
      return new Response("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const parsed = productSchema.parse(body);
    const res = await createProductServer(parsed as any);
    return NextResponse.json({ ok: true, id: res.id });
  } catch (err: any) {
    const msg = err?.message || String(err);
    return new Response(msg, { status: 500 });
  }
}
