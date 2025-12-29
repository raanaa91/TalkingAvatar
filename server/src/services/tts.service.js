require('dotenv').config();

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

const ttsService = async (text, voice = "alloy") => {

  // چک کردن نوع ورودی
  if (!text || typeof text !== 'string') {
    throw new Error('Text is required');
  }
 // استفاده از سرویس عمومی Text-To-Speech
  try {
    const response = await fetch(`${BASE_URL}/audio/speech`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-tts",
        input: text,
        voice: voice,
        format: "mp3"
      }),
    });

    // مدیریت خطا
  if (!response.ok) {
    const errText = await response.text();
    console.error('GapGPT TTS error:', response.status, errText);
    throw new Error('TTS request failed');
  }

   const audioBuffer = await response.arrayBuffer();

    return Buffer.from(audioBuffer);
} catch (err) {
    console.error("Error generating TTS:", err);
    throw err;
  }

};


module.exports = { ttsService };
