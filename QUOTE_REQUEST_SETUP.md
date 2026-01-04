# Quote Request System - Setup Guide

## Overview
A complete quote request system has been implemented with:
- Customer quote request dialog on product pages
- Firebase storage for quote requests
- Telegram notifications to admin
- Admin dashboard for managing requests

## Files Created/Modified

### New Files
1. `lib/firebase/messages.ts` - Firebase CRUD operations for messages
2. `lib/utils/telegram.ts` - Telegram notification utility
3. `app/api/messages/route.ts` - API endpoint for quote submissions
4. `components/product/RequestQuoteDialog.tsx` - Customer-facing dialog
5. `.env.local` - Added Telegram env variables (needs your tokens)

### Modified Files
1. `components/product/ProductInfoActions.tsx` - Added Request Quote button & dialog
2. `components/admin-portal/MessagesTab.tsx` - Complete rewrite for quote management
3. `components/admin-portal/AdminBottomBar.tsx` - Added Messages tab
4. `app/(admin-portal)/dashboard/page.tsx` - Enabled Messages tab

## Setup Instructions

### 1. Configure Telegram Bot

#### Create a Telegram Bot
1. Open Telegram and search for **@BotFather**
2. Send `/newbot` command
3. Follow the prompts to name your bot
4. Copy the **bot token** (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

#### Get Your Chat ID
1. Start a chat with your new bot
2. Send any message to the bot
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Look for `"chat":{"id":` in the response
5. Copy the **chat ID** (a number like: `123456789`)

### 2. Update Environment Variables

Edit `.env.local` and add your credentials:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### 3. Restart Development Server

After updating `.env.local`, restart your Next.js server:

```bash
npm run dev
```

## How It Works

### Customer Flow
1. Customer views product detail page
2. Clicks "Request a Quote" button
3. Fills in:
   - **Phone Number** (required)
   - **Name** (optional)
4. Submits the form
5. Receives success confirmation

### Backend Flow
1. Request sent to `/api/messages` endpoint
2. Data saved to Firestore `messages` collection
3. Telegram notification sent to admin
4. Response returned to customer

### Admin Flow
1. Admin opens Dashboard → Messages tab
2. Views all quote requests with:
   - Product image and name
   - Customer name and phone number
   - Submission date/time
   - Call status (Pending/Called)
3. Can:
   - Mark requests as "Called" or "Pending"
   - Click phone number to call directly
   - Delete processed requests

## Telegram Notification Format

When a customer submits a quote request, you'll receive:

```
🔔 New Quote Request

👤 Customer: John Doe
📱 Phone: 012 345 678
🚪 Product: Premium Teak Door
🔗 Product ID: prod-123

Please follow up with the customer.
```

## Firebase Collection Structure

Collection: `messages`

```typescript
{
  id: string;              // Auto-generated
  customerName: string;    // Customer's name
  phoneNumber: string;     // Customer's phone
  productId: string;       // Product ID
  productName: string;     // Product name
  productImage: string;    // Product image URL
  isCalled: boolean;       // Admin follow-up status
  createdAt: Timestamp;    // Submission time
}
```

## Troubleshooting

### Telegram notifications not working?
- Verify `TELEGRAM_BOT_TOKEN` is correct
- Verify `TELEGRAM_CHAT_ID` is correct
- Make sure you've started a chat with the bot
- Check browser console and server logs for errors

### Messages not showing in admin panel?
- Check Firebase console for the `messages` collection
- Verify Firebase rules allow read/write
- Check browser console for errors

### Quote dialog not opening?
- Check browser console for errors
- Verify all UI components are properly imported

## Next Steps

1. **Set up Telegram credentials** in `.env.local`
2. **Test the flow**:
   - Visit a product page
   - Click "Request a Quote"
   - Submit with your phone number
   - Check Telegram for notification
   - Check admin panel for the message
3. **Customize as needed**:
   - Adjust Telegram message format in `lib/utils/telegram.ts`
   - Modify dialog styling in `components/product/RequestQuoteDialog.tsx`
   - Update admin panel in `components/admin-portal/MessagesTab.tsx`

## Security Notes

- Never commit `.env.local` to git (it's in `.gitignore`)
- Keep your bot token secret
- Consider adding rate limiting to the API endpoint
- Add authentication checks to `/api/messages` if needed

---

**Need help?** Check the implementation files for detailed code and comments.
