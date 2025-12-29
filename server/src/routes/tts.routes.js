const express = require('express');
const router = express.Router();
const { generateTTS } = require('../controllers/tts.controller');

router.post('/', generateTTS);

module.exports = router;
