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

    console.log(`Message saved to Firestore: ${messageId}`);

    // Send Telegram notification (non-blocking, won't fail the request)
    console.log("🚀 Initiating Telegram notification...");
    sendTelegramNotification({
      customerName: customerName || "Not provided",
      phoneNumber,
      productName,
      productId,
    })
      .then((success) => {
        if (success) {
          console.log("✅ Telegram notification sent successfully");
        } else {
          console.warn(
            "⚠️ Telegram notification failed (check logs above for details)"
          );
        }
      })
      .catch((error) => {
        console.error("❌ Telegram notification error:", error);
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
