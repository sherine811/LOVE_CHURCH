const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// Initialize the Google Sheets API
async function appendToGoogleSheet(registrationData) {
    try {
        // Initialize auth with service account
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        // Initialize the sheet
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0]; // Use the first sheet

        // Add a row with the registration data
        await sheet.addRow({
            'Timestamp': registrationData.timestamp,
            'Full Name': registrationData.fullName,
            'Age': registrationData.age,
            'Phone/WhatsApp': registrationData.phone,
            'Church/Fellowship': registrationData.church,
            'Attending': registrationData.attending,
            'Friend Count': registrationData.friendCount,
            'Friend Names': registrationData.friendNames,
            'Payment Mode': registrationData.paymentMode,
            'Payment Status': registrationData.paymentStatus,
            'Screenshot': registrationData.screenshot
        });

        console.log('Successfully added row to Google Sheet');
        return true;
    } catch (error) {
        console.error('Error adding to Google Sheet:', error);
        throw error;
    }
}

module.exports = { appendToGoogleSheet };
