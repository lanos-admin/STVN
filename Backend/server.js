const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000', // Allow only your React app's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

app.use(express.json());

// Test route
app.get('/api/news', (req, res) => {
    res.json([
        {
            id: 1,
            title: 'Test News 1',
            content: 'This is test news content'
        }
    ]);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
