# 🚀 DESERT AUTOLABS - SMS NOTIFICATIONS & LEADERBOARD SYSTEM

## Complete Setup Guide

---

## PART 1: SMS NOTIFICATIONS (Twilio)

### Step 1: Create Twilio Account

1. **Go to:** https://www.twilio.com/try-twilio
2. **Sign up** for free account
3. **Verify** your email and phone number
4. **Get your credentials:**
   - Account SID (starts with AC...)
   - Auth Token
   - Twilio phone number (starts with +1...)

### Step 2: Set Up Google Apps Script for SMS

1. **Go to:** https://script.google.com
2. **Create new project** named "Desert AutoLabs SMS"
3. **Paste this code:**

```javascript
const TWILIO_ACCOUNT_SID = 'YOUR_ACCOUNT_SID';
const TWILIO_AUTH_TOKEN = 'YOUR_AUTH_TOKEN';
const TWILIO_PHONE_NUMBER = '+1234567890';

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const { to, message } = data;
  
  sendSMS(to, message);
  
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendSMS(to, message) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  
  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Utilities.base64Encode(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    payload: {
      'To': to,
      'From': TWILIO_PHONE_NUMBER,
      'Body': message
    }
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
  } catch (error) {
    console.error('SMS Error:', error);
    return { error: error.toString() };
  }
}

// Test function
function testSMS() {
  sendSMS('+17609999999', '🎁 Your Desert AutoLabs referral was sent! Thank you!');
}
```

4. **Replace** the placeholders with your Twilio credentials
5. **Click:** Deploy → New deployment → Web app
6. **Set:** Execute as "Me", Who has access "Anyone"
7. **Copy** the Web App URL

### Step 3: Update Website with SMS URL

1. Open `referral-form.html`
2. Find: `// SMS will be sent via backend`
3. Replace with:

```javascript
function sendSMSNotification(phone, message) {
  const smsURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
  
  fetch(smsURL, {
    method: 'POST',
    body: JSON.stringify({ to: phone, message: message })
  }).then(response => {
    console.log('SMS sent to', phone);
  }).catch(error => {
    console.log('SMS failed:', error);
  });
}
```

---

## PART 2: LEADERBOARD SYSTEM

### How It Works

The leaderboard automatically:
- Tracks referrals in localStorage
- Sorts by referral count
- Shows top 10 referrers
- Awards bonus rewards to top 3

### Customization

**Change reward amounts:**
```javascript
const rewards = {
  1: '-$25 BONUS',  // Gold
  2: '-$15',        // Silver
  3: '-$10',        // Bronze
  default: '-$10'
};
```

**Change leaderboard title:**
Edit the `<h3>` in the HTML to "🏆 Top Referrers This Week"

**Add time filtering:**
```javascript
// Filter by this month only
const thisMonth = referrals.filter(r => {
  const date = new Date(r.date);
  return date.getMonth() === new Date().getMonth();
});
```

---

## PART 3: REFERRAL REWARDS PROGRAM

### Default Rewards

| Rank | Referral Count | Reward |
|------|---------------|--------|
| 🥇 1st | Most refs | $25 Bonus |
| 🥈 2nd | 2nd most | $15 Bonus |
| 🥉 3rd | 3rd most | $10 Bonus |
| Everyone | Any referral | $10 credit |

### How to Award Rewards

1. **Check leaderboard** at the end of each month
2. **Contact top referrers** via email/SMS
3. **Apply manual discount** when they book
4. **Update Google Sheet** with "Rewarded" status

---

## PART 4: COMPLETE REFERRAL TRACKING SYSTEM

### Create Google Sheet "Referral Tracker"

| Column | Header | Purpose |
|--------|--------|---------|
| A | Date | When referral was made |
| B | Referrer Name | Person referring |
| C | Referrer Email | Contact referrer |
| D | Referrer Phone | SMS notifications |
| E | Referral Code | Unique code |
| F | Friend Name | Person referred |
| G | Friend Email | Contact friend |
| H | Friend Phone | SMS to friend |
| I | Status | Sent/Booked/Rewarded |
| J | Reward Given | Yes/No/Amount |

### Update Google Apps Script to Log to Sheet

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Referrals');
  
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.referrerName,
    data.referrerEmail,
    data.referrerPhone,
    data.referrerCode,
    data.friendName,
    data.friendEmail,
    data.friendPhone,
    'Sent',
    'No'
  ]);
  
  // Send SMS notifications
  if (data.referrerPhone) {
    sendSMSNotification(data.referrerPhone, 
      `🎁 Hi ${data.referrerName}! Your referral to ${data.friendName} was sent! Your code: ${data.referrerCode}`);
  }
  
  if (data.friendPhone) {
    sendSMSNotification(data.friendPhone,
      `🎁 You got $10 off at Desert AutoLabs! Code: ${data.referrerCode} - Book: https://clawson44.github.io/Desertautolab/`);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## PART 5: SMS TEMPLATES

### Customer Notifications

**Referral Sent (to referrer):**
```
🎁 Hi {NAME}! Your referral to {FRIEND} was sent! 
Your code: {CODE}
We'll notify you when they book!

- Desert AutoLabs
```

**Friend Invitation:**
```
🎁 {NAME} invited you to Desert AutoLabs!
Get $10 off your first visit!

Code: {CODE}
Book: https://clawson44.github.io/Desertautolab/

See you in the shop! 🔧
```

**Reward Earned:**
```
🏆 Congratulations {NAME}!
You earned a ${AMOUNT} bonus reward!
Show this code at checkout: {CODE}

- Desert AutoLabs
```

---

## 📊 REFERRAL PROGRAM METRICS

### Track These KPIs:
- Total referrals sent
- Conversion rate (sent → booked)
- Top referrers
- Referral source (website, social, in-person)
- Monthly growth

### Monthly Report Template:
```
Desert AutoLabs - Monthly Referral Report
=====================================
Month: [Month Year]

📊 Summary:
- Referrals Sent: XXX
- Conversions: XXX (XX%)
- New Customers from Referrals: XXX

🏆 Top Referrer: [Name] - [XX] referrals

💰 Rewards Given: $XXX
📈 ROI: $XXX revenue from $XXX spent

Recommendations:
1.
2.
3.
```

---

## 🔧 TROUBLESHOOTING

### SMS Not Sending?
- Check Twilio account balance
- Verify phone number format (+1...)
- Check Google Apps Script deployment

### Leaderboard Not Updating?
- Clear browser cache
- Check localStorage is enabled
- Verify referrals are being saved

### Referrals Not Tracking?
- Check Google Sheet connection
- Verify Apps Script permissions
- Check for JavaScript errors in console

---

## 📁 FILES UPDATED

| File | Changes |
|------|---------|
| `referral-form.html` | Added leaderboard + SMS section |
| `index.html` | Added leaderboard section |
| `SMS_LEADERBOARD_SETUP.md` | This guide |

---

## ✅ QUICK START CHECKLIST

- [ ] Create Twilio account
- [ ] Set up Google Apps Script for SMS
- [ ] Deploy web app and copy URL
- [ ] Update referral-form.html with SMS URL
- [ ] Create Google Sheet for tracking
- [ ] Test referral flow end-to-end
- [ ] Set up monthly leaderboard review

---

## 🚀 UPGRADE OPTIONS

### Level 1: Automated (Current)
- Manual SMS via Google Apps Script
- LocalStorage tracking
- Monthly manual rewards

### Level 2: Semi-Automated (Add $)
- Twilio API integration
- Auto-apply discounts at checkout
- Email/SMS automation

### Level 3: Full Automation ($$)
- Custom booking system
- Auto-track referrals
- Instant reward application
- Real-time leaderboard

---

*System created: February 19, 2026*
*For: Desert AutoLabs*
