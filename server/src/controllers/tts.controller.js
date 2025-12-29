const { ttsService } = require('../services/tts.service');
const { lipSyncMock } = require('../utils/lipSync.mock');


const generateTTS = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !isNaN(text)) {
      return res.status(400).json({ error: 'Text is required' });
    }
    // دریافت صدای خام از سرویس TTS
    const audioBuffer = await ttsService(text);
    // mock کردن اطلاعات مربوط به lip sync
    const mockedResult = await lipSyncMock(text, audioBuffer);
    const { audio, lipSync, duration } = mockedResult;
    
     return res.json({
      audio,
      lipSync,
      duration
    });
  } catch (error) {
    console.error('TTS Controller Error:', error);
    return res.status(500).json({ error: 'TTS failed' });
  }
};

module.exports = { generateTTS };