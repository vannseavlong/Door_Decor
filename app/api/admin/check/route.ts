import { NextResponse } from "next/server";
import { isAllowedAdmin } from "@/lib/firebase/whitelist";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body?.email;
    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const allowed = isAllowedAdmin(email);
    return NextResponse.json({ allowed });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
