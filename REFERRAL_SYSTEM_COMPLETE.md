# 🚀 DESERT AUTOLABS - MAXED OUT REFERRAL SYSTEM

## Complete Setup Guide

---

## STEP 1: Create Google Sheet for Tracking

1. **Go to:** https://sheets.google.com
2. **Click:** "+ New Spreadsheet"
3. **Name it:** "Desert AutoLabs Referrals"
4. **Rename first tab to:** "Referrals"
5. **Add these headers in Row 1:**
   - A1: `Date`
   - B1: `Referrer Name`
   - C1: `Referrer Email`
   - D1: `Referral Code`
   - E1: `Friend Name`
   - F1: `Friend Email`
   - G1: `Status`
   - H1: `Discount Used`
6. **Format:** Select A1:H1 → Set background to orange (`#E76F51`) → Set text white → Bold

---

## STEP 2: Set Up Google Apps Script

1. **In your Google Sheet, click:** Extensions → Apps Script
2. **Delete** any code already there
3. **Copy and paste** the code from `REFERRAL_TRACKING_CODE.gs`
4. **Click:** Save (disk icon)
5. **Click:** Deploy → New deployment
6. **Click:** Select type → "Web app"
7. **Configure:**
   - Description: "Referral Tracking"
   - Execute as: "Me"
   - Who has access: "Anyone"
8. **Click:** Deploy
9. **Copy** the Web app URL (starts with `https://script.google.com/...`)

---

## STEP 3: Update Website with Your URL

1. **Open:** `referral-form.html`
2. **Find:** `const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. **Replace** with your actual URL from Step 2
4. **Save** the file

---

## STEP 4: How the System Works

### For Customers:
1. Customer fills out referral form on your site
2. Clicks "Send Referral"
3. Friend receives email invitation with $10 off code
4. Customer gets confirmation email with their referral code

### For You (Tracking):
1. All referrals automatically log to Google Sheet
2. See who's referring friends
3. Track when discount codes are used
4. Generate reports on referral success

---

## STEP 5: Custom Discount Codes

Create custom codes for repeat customers:

| Customer | Code | Discount |
|----------|------|----------|
| Mike | `MIKE10` | $10 |
| Alex | `ALEX15` | $15 |
| Jorge | `JORGE20` | $20 |
| VIP Members | `VIP25` | $25 |

**To add new codes:**
1. Open Google Sheet
2. Add row with new referral info
3. Customer uses that code at checkout

---

## STEP 6: Track Discount Usage

When a customer uses a referral code:

1. **Find** their referral code in the Google Sheet
2. **Mark** "Discount Used" column as "Yes"
3. **Give** them $10 off their rental

---

## STEP 7: Optional - Set Up Auto-Reply from Gmail

To send automated emails without using MailApp (has daily limits):

1. **In Google Sheet, create new tab:** "Settings"
2. **Add:**
   - A1: `Admin Email` → Your email
   - A2: `Business Name` → Desert AutoLabs
   - A3: `Website URL` → https://clawson44.github.io/Desertautolab/

---

## 📊 REFERRAL TRACKING DASHBOARD

### Quick Stats to Track:
- Total referrals sent
- Referrals that converted (booked)
- Most active referrers
- Best performing month

### To create a dashboard:
1. Create new tab in Google Sheet called "Dashboard"
2. Use formulas like:
   - `=COUNTA(Referrals!A:A)-1` = Total Referrals
   - `=COUNTIF(Referrals!H:H, "Yes")` = Discounts Used
   - `=B2/C2*100` = Conversion Rate

---

## 🔧 TROUBLESHOOTING

### "Email not sending?"
- Check Google Account daily email limits (100/day for free accounts)
- Consider upgrading to Google Workspace for higher limits

### "Form not submitting?"
- Verify Google Apps Script URL is correct
- Re-deploy script if URL changed

### "Tracking not working?"
- Check Google Sheet is shared with your email
- Verify column headers match exactly

---

## 📁 FILES CREATED

| File | Purpose |
|------|---------|
| `referral-form.html` | Standalone referral page |
| `REFERRAL_TRACKING_CODE.gs` | Google Apps Script backend |
| `REFERRAL_SYSTEM_COMPLETE.md` | This guide |

---

## ✅ QUICK START CHECKLIST

- [ ] Create Google Sheet "Desert AutoLabs Referrals"
- [ ] Set up Apps Script with tracking code
- [ ] Deploy web app and copy URL
- [ ] Update referral-form.html with URL
- [ ] Test the system with a fake referral
- [ ] Check Google Sheet for data
- [ ] Customize referral codes for regulars

---

## 💰 REFERRAL PROGRAM SUMMARY

**For Referrer:**
- Earn $10 credit per successful referral
- Track referrals in Google Sheet
- Get confirmation emails

**For Friend:**
- Get $10 off first visit
- Unique referral code
- Email invitation

**For You:**
- Automatic tracking in Google Sheets
- Know which customers are promoting you
- Measure program success

---

## 🚀 NEXT LEVEL UPGRADES (Optional)

1. **Auto-apply discounts** - Connect to booking system
2. **SMS notifications** - Add Twilio for text alerts
3. **Slack integration** - Get notified in Slack when referrals come in
4. **Rewards program** - Give bonus after 5 referrals
5. **Leaderboard** - Show top referrers on website

---

*System created: February 19, 2026*
*For: Desert AutoLabs*
