/**
 * Desert AutoLabs Referral Tracking System
 * Google Apps Script - Copy this to Google Sheets
 */

function doPost(e) {
  // Get the active spreadsheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Referrals');
  
  // Parse the form data
  const formData = JSON.parse(e.postData.contents);
  
  // Add new row with referral data
  sheet.appendRow([
    new Date(),                           // Date
    formData.referrerName,                // Referrer Name
    formData.referrerEmail,               // Referrer Email
    formData.referrerCode,                // Referral Code
    formData.friendName,                  // Friend Name
    formData.friendEmail,                 // Friend Email
    formData.status || 'Pending',         // Status
    formData.discountUsed || 'No'         // Discount Used
  ]);
  
  // Send confirmation email to referrer
  sendConfirmationEmail(formData);
  
  // Send invitation email to friend
  sendFriendInvitation(formData);
  
  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendConfirmationEmail(data) {
  const subject = '🎁 Your Desert AutoLabs Referral is on its way!';
  const body = `
Hi ${data.referrerName}!

Thanks for referring ${data.friendName} to Desert AutoLabs!

📋 Referral Summary:
- Your Referral Code: ${data.referrerCode}
- Your Friend: ${data.friendName}
- Date: ${new Date().toLocaleDateString()}

🎉 When ${data.friendName} books their first visit and uses your code,
you'll earn $10 credit toward your next rental!

Your code: ${data.referrerCode}

Book now: https://clawson44.github.io/Desertautolab/

See you in the shop! 🔧

- The Desert AutoLabs Team
`;
  
  MailApp.sendEmail({
    to: data.referrerEmail,
    subject: subject,
    body: body
  });
}

function sendFriendInvitation(data) {
  const subject = '🎁 You got $10 off at Desert AutoLabs!';
  const body = `
Hi ${data.friendName}!

Your friend ${data.referrerName} wants you to experience Desert AutoLabs!

🔥 YOUR $10 OFF DISCOUNT CODE: ${data.referrerCode}

Why Desert AutoLabs?
✅ Professional 2-post lifts
✅ 50+ tools included
✅ Climate controlled workspace
✅ Save $100s vs. mechanic labor rates

Use your code at checkout to get $10 off your first visit!

Book now: https://clawson44.github.io/Desertautolab/

See you in the shop! 🔧

- The Desert AutoLabs Team
`;
  
  MailApp.sendEmail({
    to: data.friendEmail,
    subject: subject,
    body: body
  });
}

// Initialize the spreadsheet
function setupSpreadsheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Referrals');
  if (!sheet) {
    const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Referrals');
    newSheet.appendRow([
      'Date', 'Referrer Name', 'Referrer Email', 'Referral Code', 
      'Friend Name', 'Friend Email', 'Status', 'Discount Used'
    ]);
    newSheet.getRange('A1:H1').setBackground('#E76F51').setFontColor('white').setFontWeight('bold');
  }
}

// Test function
function testEmail() {
  const testData = {
    referrerName: 'John',
    referrerEmail: 'test@example.com',
    referrerCode: 'JOHN10',
    friendName: 'Jane',
    friendEmail: 'jane@example.com'
  };
  sendFriendInvitation(testData);
}
