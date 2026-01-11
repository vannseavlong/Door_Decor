# Fix Telegram on Vercel - Step by Step

## Issue
Telegram notifications work locally but not on Vercel deployment.

## Root Cause (Most Likely)
**Missing environment variables** on Vercel or **incorrect variable names**.

---

## 🔧 Fix Steps

### Step 1: Verify Environment Variables on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project → **Settings** → **Environment Variables**
3. Check if these variables exist:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

**If missing:**
- Click "Add New"
- Add both variables for **Production**, **Preview**, and **Development**
- Get values from your local `.env.local` file

**If they exist:**
- Verify the values match your local `.env.local` exactly
- Check for typos in variable names (case-sensitive!)

### Step 2: Redeploy

**IMPORTANT:** Environment variable changes require a new deployment!

```bash
git add .
git commit -m "Add Telegram debug logging"
git push origin dev
```

Or trigger manual redeploy in Vercel Dashboard → Deployments → Redeploy

### Step 3: Check Logs

After redeployment:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click the latest deployment
3. Click **Functions** tab
4. Submit a test quote on your live site
5. Look for these logs:

**✅ Success logs:**
```
🔍 Telegram Debug: { hasBotToken: true, hasTokenLength: 46, hasChatId: true }
📤 Attempting to send Telegram message...
✅ Telegram notification sent successfully
```

**❌ Missing credentials:**
```
🔍 Telegram Debug: { hasBotToken: false, hasTokenLength: 0, hasChatId: false }
❌ Telegram credentials not configured { botToken: 'MISSING', chatId: 'MISSING' }
```
→ **Fix:** Add environment variables (Step 1)

**❌ Invalid credentials:**
```
❌ Telegram API error response: { status: 401, statusText: 'Unauthorized' }
```
→ **Fix:** Wrong bot token, regenerate from @BotFather

**❌ Wrong Chat ID:**
```
❌ Telegram API error response: { status: 400, error: 'Bad Request: chat not found' }
```
→ **Fix:** Wrong chat ID, get correct one from IDBot

**❌ Timeout:**
```
⏱️ Telegram notification timeout after 10s
```
→ **Issue:** Network connectivity problem (rare on Vercel)
→ **Alternative:** Use Firebase Cloud Functions or Make.com webhook

---

## 🎯 Quick Test Commands

### Test locally:
```bash
npm run dev
# Open http://localhost:3000/products/[any-product]
# Click "Get a Quote" → Submit
# Check terminal for Telegram logs
```

### Test on Vercel:
1. Open your live site
2. Go to any product page
3. Click "Get a Quote" and submit
4. Check Vercel function logs (as described in Step 3)

---

## 📋 Checklist

- [ ] Environment variables added to Vercel
- [ ] Variable names match exactly: `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
- [ ] Values match your local `.env.local`
- [ ] Redeployed after adding variables
- [ ] Tested quote submission on live site
- [ ] Checked Vercel function logs

---

## 🆘 Still Not Working?

### Alternative Solution 1: Use Make.com Webhook
Instead of calling Telegram directly from Vercel:

1. Create free account at [Make.com](https://make.com)
2. Create scenario: Webhook → Telegram
3. Update API route to call Make webhook instead of Telegram API
4. More reliable, no timeout issues

### Alternative Solution 2: Firebase Cloud Functions
Move Telegram notification to Firebase (better for external API calls):
- See [TELEGRAM_TROUBLESHOOTING.md](./TELEGRAM_TROUBLESHOOTING.md#option-2-firebase-cloud-functions)

### Alternative Solution 3: Email Notifications
Replace Telegram with email using Nodemailer or SendGrid:
- More reliable from serverless functions
- See [TELEGRAM_TROUBLESHOOTING.md](./TELEGRAM_TROUBLESHOOTING.md#option-3-email-notifications-instead)

---

## 💡 How to Get Telegram Credentials

### Get Bot Token:
1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/newbot` (or use existing bot)
3. Follow prompts
4. Copy the token (looks like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Get Chat ID:
1. Message [@userinfobot](https://t.me/userinfobot) on Telegram
2. It will reply with your chat ID (looks like `123456789`)
3. Or for group: Add [@RawDataBot](https://t.me/RawDataBot) to your group

---

## 🔍 Understanding the Logs

The enhanced logging shows:
- `🔍` = Initial check of environment variables
- `📤` = Starting API call to Telegram
- `✅` = Success
- `❌` = Error with details
- `⚠️` = Warning (non-critical)
- `⏱️` = Timeout issue

---

**Last Updated:** January 11, 2026
