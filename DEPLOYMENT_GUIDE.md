# 🚀 Quick Start: Deploy Your Church Event Website

## ✅ What's Been Done

Your project is now configured with:
- ✅ Google Sheets integration for permanent data storage
- ✅ Vercel-ready deployment configuration
- ✅ All code pushed to GitHub

## 📋 What You Need to Do (3 Main Steps)

### **Step 1: Set Up Google Sheet (10 minutes)**

1. **Create the spreadsheet:**
   - Go to https://sheets.google.com
   - Create new blank sheet
   - Name it: "Be Love Event Registrations"
   - Add column headers: Timestamp, Full Name, Age, Phone/WhatsApp, Church/Fellowship, Attending, Friend Count, Friend Names, Payment Mode, Payment Status, Screenshot

2. **Get the Sheet ID:**
   - Look at the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
   - Copy the long ID between `/d/` and `/edit`
   - Save it somewhere!

3. **Create Service Account:**
   - Go to https://console.cloud.google.com/
   - Create new project: "Church Events"
   - Enable "Google Sheets API"
   - Create Service Account with "Editor" role
   - Download JSON key file

4. **Share Sheet with Service Account:**
   - Open your Google Sheet
   - Click "Share"
   - Add the service account email (from JSON file)
   - Give "Editor" access

📖 **Detailed instructions:** See `GOOGLE_SHEETS_SETUP.md`

---

### **Step 2: Deploy to Vercel (5 minutes)**

1. **Go to Vercel:**
   - Visit https://vercel.com/signup
   - Sign in with GitHub

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select "LOVE_CHURCH" repository
   - Click "Import"

3. **Configure:**
   - Framework: **Vite**
   - Root Directory: **client**
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables:**
   Click "Environment Variables" and add these 3:
   
   ```
   GOOGLE_SHEET_ID = your_sheet_id_from_step_1
   GOOGLE_SERVICE_ACCOUNT_EMAIL = email_from_json_file
   GOOGLE_PRIVATE_KEY = private_key_from_json_file
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get your permanent URL! 🎉

---

### **Step 3: Test & Share (2 minutes)**

1. **Test the website:**
   - Visit your Vercel URL
   - Submit a test registration
   - Check your Google Sheet - you should see the data!

2. **Share the link:**
   - Share your Vercel URL with your church community
   - Monitor registrations in real-time on Google Sheet

---

## 🎯 Your Permanent URL

After deployment, you'll get a URL like:
- `https://love-church.vercel.app`
- Or `https://your-project-name.vercel.app`

This link is:
- ✅ **FREE forever**
- ✅ **Always online** (24/7)
- ✅ **Fast** (global CDN)
- ✅ **Secure** (automatic HTTPS)

---

## 📊 Managing Registrations

All registrations will appear in your Google Sheet instantly!

You can:
- ✅ View all registrations in real-time
- ✅ Download as Excel/CSV
- ✅ Share with your team
- ✅ Create charts and reports
- ✅ Filter and sort data

---

## 🆘 Need Help?

If you get stuck:
1. Check `GOOGLE_SHEETS_SETUP.md` for detailed instructions
2. Make sure all 3 environment variables are set correctly in Vercel
3. Check that you shared the Google Sheet with the service account email

---

## 🎉 That's It!

Once deployed, your church event registration website will be live and accepting registrations!

**Estimated Total Time:** 15-20 minutes
