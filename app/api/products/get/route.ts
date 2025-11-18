import { NextResponse } from "next/server";
import { getProductsServer } from "@/lib/firebase/firestore";

export async function GET() {
  try {
    const products = await getProductsServer();
    return NextResponse.json(products);
  } catch (err: any) {
    return new Response(err?.message || "Failed to fetch products", {
      status: 500,
    });
  }
}
