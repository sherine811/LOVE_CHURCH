# Google Sheets Integration Setup Guide

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it: **"Be Love Event Registrations"**
4. Add these column headers in the first row (A1 to K1):
   - Timestamp
   - Full Name
   - Age
   - Phone/WhatsApp
   - Church/Fellowship
   - Attending
   - Friend Count
   - Friend Names
   - Payment Mode
   - Payment Status
   - Screenshot

5. **Copy the Sheet ID** from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the long ID between `/d/` and `/edit`
   - Save this ID - you'll need it later!

---

## Step 2: Create Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project:
   - Click **"Select a project"** → **"New Project"**
   - Name: **"Church Events"**
   - Click **"Create"**

3. Enable Google Sheets API:
   - In the search bar, type **"Google Sheets API"**
   - Click on it and click **"Enable"**

4. Create Service Account:
   - Go to **"APIs & Services"** → **"Credentials"**
   - Click **"Create Credentials"** → **"Service Account"**
   - Service account name: **"church-events-bot"**
   - Click **"Create and Continue"**
   - Role: Select **"Editor"**
   - Click **"Continue"** → **"Done"**

5. Create Service Account Key:
   - Click on the service account you just created
   - Go to **"Keys"** tab
   - Click **"Add Key"** → **"Create new key"**
   - Choose **"JSON"**
   - Click **"Create"** - A JSON file will download

6. Open the downloaded JSON file and find:
   - `client_email` - Copy this email address
   - `private_key` - Copy the entire private key (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)

---

## Step 3: Share Google Sheet with Service Account

1. Open your Google Sheet
2. Click **"Share"** button (top right)
3. Paste the **service account email** (from step 2.6)
4. Give it **"Editor"** access
5. Click **"Send"**

---

## Step 4: Add Environment Variables to Vercel

When you deploy to Vercel, add these 3 environment variables:

1. **GOOGLE_SHEET_ID**
   - Value: The Sheet ID you copied in Step 1.5

2. **GOOGLE_SERVICE_ACCOUNT_EMAIL**
   - Value: The `client_email` from the JSON file

3. **GOOGLE_PRIVATE_KEY**
   - Value: The `private_key` from the JSON file (paste the entire key including BEGIN and END lines)

---

## Step 5: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Add the 3 environment variables above
4. Deploy!

---

## Testing Locally (Optional)

To test locally before deploying:

1. Create a `.env` file in the root directory
2. Add these lines (replace with your actual values):

```
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email_here
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
```

3. Run: `node server/server.js`

---

## ✅ Done!

Now every registration will be automatically saved to your Google Sheet in real-time!

You can:
- View all registrations instantly
- Share with your team
- Download as Excel/CSV
- Filter and sort data
- Create charts and reports

---

## Need Help?

If you get stuck on any step, let me know which step number and I'll help you!
