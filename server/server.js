const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve the static files from the React app build
app.use(express.static(path.join(__dirname, '../client/dist')));

// CSV Configuration
const csvFilePath = path.join(__dirname, 'registrations.csv');
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

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

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
            screenshot: req.file ? req.file.filename : 'N/A'
        };

        await csvWriter.writeRecords([registrationData]);
        res.status(200).json({ message: 'Registration successful!', data: registrationData });
    } catch (error) {
        console.error('Error saving registration:', error);
        res.status(500).json({ error: 'Failed to save registration' });
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
