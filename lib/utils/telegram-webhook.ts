/**
 * Alternative Telegram notification using webhook relay (Make.com/Zapier)
 * This is more reliable from Vercel than calling Telegram API directly
 *
 * Setup:
 * 1. Create free account at Make.com
 * 2. Create new scenario: Webhook → Telegram
 * 3. Copy webhook URL
 * 4. Add TELEGRAM_WEBHOOK_URL to Vercel environment variables
 */

export async function sendTelegramNotificationViaWebhook(params: {
  customerName: string;
  phoneNumber: string;
  productName: string;
  productId: string;
}): Promise<boolean> {
  const webhookUrl = process.env.TELEGRAM_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("⚠️ TELEGRAM_WEBHOOK_URL not configured");
    return false;
  }

  try {
    console.log("📤 Sending via webhook relay...");

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName: params.customerName,
        phoneNumber: params.phoneNumber,
        productName: params.productName,
        productId: params.productId,
        timestamp: new Date().toISOString(),
      }),
      // Shorter timeout - webhooks are fast
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error("❌ Webhook failed:", response.status);
      return false;
    }

    console.log("✅ Webhook sent successfully");
    return true;
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return false;
  }
}
