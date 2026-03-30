// Load env vars first — must be before any other imports
require('dotenv').config();

const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'Bavio.ai API' });
});

// Routes
app.use('/auth', authRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`🚀 Bavio.ai server listening on port ${process.env.PORT || 3000}`);
});
