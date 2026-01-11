# Webhook Setup Guide (Recommended Solution)

## Why Webhook?
Vercel → Telegram API = Timeout ❌  
Vercel → Webhook → Telegram = Fast ✅

Webhook services have better routing and reliability.

---

## Setup (5 minutes)

### Step 1: Create Make.com Account
1. Go to https://make.com/en/register
2. Sign up (free plan works)

### Step 2: Create Telegram Scenario
1. Click **Create a new scenario**
2. Add modules:
   - **Webhooks** → **Custom webhook**
   - Click webhook → **Add** → Copy the webhook URL
   - **Telegram** → **Send a Message**
   - Connect to your bot (use your TELEGRAM_BOT_TOKEN)

### Step 3: Configure Telegram Module
In the "Send a Message" module:
- **Chat ID**: Your TELEGRAM_CHAT_ID (from env)
- **Text**: 
  ```
  🔔 New Quote Request

  👤 Customer: {{customerName}}
  📱 Phone: {{phoneNumber}}
  🚪 Product: {{productName}}
  🔗 ID: {{productId}}
  🕐 Time: {{timestamp}}
  ```

### Step 4: Save & Activate
1. Click **Save**
2. Toggle **ON** (bottom left)

### Step 5: Add to Vercel
1. Go to Vercel → Environment Variables
2. Add new variable:
   - **Name**: `TELEGRAM_WEBHOOK_URL`
   - **Value**: Your Make.com webhook URL
   - **Environments**: Production, Preview, Development

### Step 6: Update Code
Replace in `/app/api/messages/route.ts`:

```typescript
// Old:
import { sendTelegramNotification } from "@/lib/utils/telegram";

// New:
import { sendTelegramNotificationViaWebhook } from "@/lib/utils/telegram-webhook";

// In POST function, replace:
sendTelegramNotification({...})

// With:
sendTelegramNotificationViaWebhook({...})
```

### Step 7: Deploy
```bash
git add .
git commit -m "Switch to webhook-based Telegram notifications"
git push origin dev
```

---

## Test
1. Submit a quote on your live site
2. Check Make.com scenario history
3. Should receive Telegram message instantly ✅

---

## Benefits
- ✅ No timeouts
- ✅ Better reliability
- ✅ Can add more actions (email, Slack, etc.)
- ✅ Logs in Make.com dashboard
- ✅ Retry logic built-in

---

## Cost
- **Make.com Free**: 1,000 operations/month
- **Zapier Free**: 100 tasks/month  
- **n8n**: Self-hosted (free)

For a small business, Make.com free tier is plenty.
