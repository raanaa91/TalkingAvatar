const express = require('express');
const cors = require('cors');
const ttsRoutes = require('./routes/tts.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tts', ttsRoutes);

module.exports = app;
