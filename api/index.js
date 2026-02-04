const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { appendToGoogleSheet } = require('../server/googleSheets');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Multer Storage Configuration (memory storage for serverless)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Registration endpoint
app.post('/api/register', upload.single('screenshot'), async (req, res) => {
    try {
        const formData = req.body;
        const registrationData = {
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            fullName: formData.fullName,
            age: formData.age,
            phone: formData.phone,
            church: formData.church,
            attending: formData.attending,
            friendCount: formData.friendCount || '0',
            friendNames: formData.friendNames || '',
            paymentMode: formData.paymentMode,
            paymentStatus: formData.paymentStatus,
            screenshot: req.file ? req.file.originalname : 'N/A'
        };

        // Save to Google Sheets
        await appendToGoogleSheet(registrationData);

        res.status(200).json({
            message: 'Registration successful! Your details have been saved.',
            data: registrationData
        });
    } catch (error) {
        console.error('Error saving registration:', error);
        res.status(500).json({
            error: 'Failed to save registration. Please try again.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API is running' });
});

// Export for Vercel serverless
module.exports = app;
