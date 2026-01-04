export async function sendTelegramNotification(params: {
  customerName: string;
  phoneNumber: string;
  productName: string;
  productId: string;
}): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("Telegram credentials not configured");
    return false;
  }

  const message = `
🔔 *New Quote Request*

👤 *Customer:* ${params.customerName || "Not provided"}
📱 *Phone:* ${params.phoneNumber}
🚪 *Product:* ${params.productName}
🔗 *Product ID:* ${params.productId}

_Please follow up with the customer._
  `.trim();

  try {
    // Add timeout controller (10 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.text();
      console.error("Telegram API error response:", error);
      return false;
    }

    console.log("Telegram notification sent successfully");
    return true;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("Telegram notification timeout after 10s");
      } else {
        console.error("Error sending Telegram notification:", error.message);
      }
    } else {
      console.error("Error sending Telegram notification:", error);
    }
    return false;
  }
}
