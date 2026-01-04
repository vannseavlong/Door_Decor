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
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Telegram API error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    return false;
  }
}
