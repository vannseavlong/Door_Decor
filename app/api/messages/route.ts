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

    // Send Telegram notification (wait for response like portfolio)
    console.log("🚀 Sending Telegram notification...");
    const telegramSuccess = await sendTelegramNotification({
      customerName: customerName || "Not provided",
      phoneNumber,
      productName,
      productId,
    });

    if (telegramSuccess) {
      console.log("✅ Telegram sent successfully");
    } else {
      console.warn("⚠️ Telegram failed (but Firestore saved)");
    }

    // Return response like portfolio (with 'ok' field)
    return NextResponse.json(
      {
        success: true,
        ok: telegramSuccess,
        messageId,
      },
      { status: 201 }
    );
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
