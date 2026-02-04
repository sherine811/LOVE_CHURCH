const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// CSV Configuration
const csvFilePath = path.join(__dirname, '../registrations.csv');
const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: [
        { id: 'timestamp', title: 'Timestamp' },
        { id: 'fullName', title: 'Full Name' },
        { id: 'age', title: 'Age' },
        { id: 'phone', title: 'Phone/WhatsApp' },
        { id: 'church', title: 'Church/Fellowship' },
        { id: 'attending', title: 'Attending' },
        { id: 'friendCount', title: 'Friend Count' },
        { id: 'friendNames', title: 'Friend Names' },
        { id: 'paymentMode', title: 'Payment Mode' },
        { id: 'paymentStatus', title: 'Payment Status' },
        { id: 'screenshot', title: 'Screenshot URL' }
    ],
    append: fs.existsSync(csvFilePath)
});

// Multer Storage Configuration (for serverless, we'll use memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
app.post('/api/register', upload.single('screenshot'), async (req, res) => {
    try {
        const formData = req.body;
        const registrationData = {
            timestamp: new Date().toLocaleString(),
            fullName: formData.fullName,
            age: formData.age,
            phone: formData.phone,
            church: formData.church,
            attending: formData.attending,
            friendCount: formData.friendCount,
            friendNames: formData.friendNames || '',
            paymentMode: formData.paymentMode,
            paymentStatus: formData.paymentStatus,
            screenshot: req.file ? req.file.originalname : 'N/A'
        };

        await csvWriter.writeRecords([registrationData]);
        res.status(200).json({ message: 'Registration successful!', data: registrationData });
    } catch (error) {
        console.error('Error saving registration:', error);
        res.status(500).json({ error: 'Failed to save registration' });
    }
});

// Export for Vercel serverless
module.exports = app;
