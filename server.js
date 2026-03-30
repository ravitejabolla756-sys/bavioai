// Load env vars first — must be before any other imports
require('dotenv').config();

const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bavio.ai server running');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`🚀 Bavio.ai server listening on port ${process.env.PORT || 3000}`);
});
