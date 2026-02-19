# Desert AutoLabs Referral System

## Setup Instructions

### Option 1: Google Forms (Free & Easy)

1. **Go to:** https://forms.google.com

2. **Create a new form** with fields:
   - Referrer Name
   - Referrer Email
   - Friend's Name
   - Friend's Email
   - Referral Code (optional)

3. **Click "Send"** → "Get pre-filled link"

4. **Copy the form URL** and replace the referral form with:
```html
<iframe src="YOUR_GOOGLE_FORM_URL" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
```

### Option 2: Typeform (Looks Better)
1. Go to https://typeform.com
2. Create free account
3. Build referral form
4. Get embed code and replace the form section

### Option 3: Airtable (For Tracking)
1. Create free Airtable base
2. Add fields: Referrer Name, Referrer Email, Friend Name, Friend Email, Referral Code, Status
3. Use Airtable Forms to collect referrals
4. Track who referred who

---

## How the Current System Works

The current form (already in your website) uses a `mailto:` system:

1. Customer fills out the referral form
2. Clicks "Send Referral"
3. Their email client opens with a pre-written invitation to their friend
4. You receive the form data in a Google Sheet for tracking

---

## Tracking Referrals (Recommended Setup)

### Set up Google Sheets tracking:

1. Go to https://forms.google.com
2. Click **"Responses"** tab
3. Click **Link to Sheets** → **Create a new spreadsheet**
4. Name it "Desert AutoLabs Referrals"

Now every referral gets automatically tracked!

---

## Referral Code System

Create simple referral codes for tracking:

- `DIESEL10` - for Diesel
- `MIKE20` - for Mike
- `ALEX15` - for Alex

When someone books, ask for their referral code and apply $10 discount.

---

## Automated Email (Advanced)

To send automated emails when referrals come in:

1. In Google Forms → **Responses** → **Add email notifications**
2. Or use **Google Apps Script** for custom emails
3. Or use **Zapier** to connect Google Forms to Gmail

---

## Current Website Form Code

The referral form is already in your site at:
`/Users/diesel/.openclaw/workspace/desert-autolabs/index.html`

It includes:
- Form fields for referrer and friend info
- Referral code input
- Success message after submission
- "Refer Another Friend" button

---

## Need Help?

Contact me and I can help you:
- Set up Google Forms tracking
- Create a custom referral tracking system
- Integrate with email marketing (Mailchimp, etc.)
- Add referral codes to your booking system

---

*Referral System created: 2026-02-19*
