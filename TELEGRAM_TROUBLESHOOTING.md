# Telegram Notification Troubleshooting

## Issue
Vercel serverless functions timing out when connecting to Telegram API (Error: ETIMEDOUT).

## What We Fixed
1. ✅ Added 10-second timeout to prevent hanging requests
2. ✅ Improved error logging to identify the exact failure point
3. ✅ Made Telegram notification non-blocking (won't fail quote submission)
4. ✅ Added better console logs for debugging

## Current Behavior
- Quote requests **ALWAYS save to Firestore** (admin panel works)
- Telegram notifications **attempt to send** but may timeout
- Customer sees success message regardless (good UX)

## Alternative Solutions

### Option 1: Use Telegram Bot API with Webhook (Recommended)
Instead of calling Telegram directly from Vercel, use a third-party service:

**Services:**
- [Make.com](https://make.com) - Free tier, visual workflow builder
- [Zapier](https://zapier.com) - Popular automation platform
- [n8n](https://n8n.io) - Self-hosted alternative

**How it works:**
1. Your API sends a webhook to Make/Zapier
2. Make/Zapier receives it and sends to Telegram
3. No timeout issues, reliable delivery

### Option 2: Firebase Cloud Functions
Move Telegram notification to Firebase Functions (better network reliability):

```typescript
// functions/src/index.ts
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const sendTelegramOnNewMessage = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snap, context) => {
    const message = snap.data();
    
    // Send to Telegram here
    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    try {
      await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: `New quote from ${message.customerName}\\nPhone: ${message.phoneNumber}\\nProduct: ${message.productName}`,
        }),
      });
    } catch (error) {
      console.error("Telegram error:", error);
    }
  });
```

### Option 3: Email Notifications Instead
Replace Telegram with email (more reliable from Vercel):

**Install:**
```bash
npm install nodemailer
```

**Use:**
```typescript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: "admin@yourdomain.com",
  subject: "New Quote Request",
  text: `Customer: ${customerName}\\nPhone: ${phoneNumber}`,
});
```

### Option 4: Keep Current Setup + Manual Check
Since admin panel works perfectly:
- Keep the current implementation
- Check admin panel regularly for new requests
- Telegram is a "nice to have" bonus when it works

## Testing After Changes

1. **Deploy to Vercel:**
   ```bash
   git add .
   git commit -m "fix: improve telegram notification timeout handling"
   git push origin dev
   ```

2. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click latest deployment → Functions
   - Look for logs from `/api/messages`
   - You should see: "Telegram notification timeout after 10s" or success message

3. **Test Quote Request:**
   - Submit a quote from production site
   - Check admin panel (should always work)
   - Check Vercel logs for Telegram status

## Recommended Path Forward

**Short term (now):**
- Deploy the timeout fix (already done above)
- Monitor Vercel logs to confirm timeouts
- Use admin panel for all quote management

**Medium term (next week):**
- Set up Make.com webhook as Telegram bridge
- Or enable email notifications as backup

**Long term (optional):**
- Migrate to Firebase Cloud Functions for Telegram
- More reliable for Firebase-heavy apps

---

**Current Status:** System is production-ready. Quotes save reliably, Telegram is bonus feature.
