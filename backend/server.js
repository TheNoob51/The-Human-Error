const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import Routes
const geminiRoutes = require('./routes/gemini');
const trainingThreatRoutes = require('./routes/trainingThreats');

// Use Routes
app.use('/api', geminiRoutes);
app.use('/api', trainingThreatRoutes);

app.get('/', (req, res) => {
    res.send('CyberSecurity Simulation Backend Running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
