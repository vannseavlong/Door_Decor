import { NextRequest, NextResponse } from "next/server";
import { addMessage } from "@/lib/firebase/messages";
import { sendTelegramNotification } from "@/lib/utils/telegram";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, phoneNumber, productId, productName, productImage } =
      body;

    // Validate required fields
    if (!phoneNumber || !productId || !productName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to Firestore
    const messageId = await addMessage({
      customerName: customerName || "Not provided",
      phoneNumber,
      productId,
      productName,
      productImage: productImage || "",
    });

    // Send Telegram notification (non-blocking)
    sendTelegramNotification({
      customerName: customerName || "Not provided",
      phoneNumber,
      productName,
      productId,
    }).catch((error) => {
      console.error("Failed to send Telegram notification:", error);
    });

    return NextResponse.json({ success: true, messageId }, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to submit quote request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
