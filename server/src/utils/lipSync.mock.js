  const lipSyncMock = async (text, audioBuffer) => {

    // تخمین مدت زمان صدا بر اساس طول متن
    // فرض: هر کاراکتر حدود 0.1 ثانیه زمان می‌برد
    const estimatedDuration = Math.max(text.length * 0.1, 1.5);
    
    // تولید lipSync بر اساس مدت زمان تخمین زده شده
    const lipSync = generateLipSync(estimatedDuration);
    
    // تبدیل صدا به Base64 برای ارسال به فرانت
    const audioBase64 = audioBuffer.toString('base64');

    return ({
      audio: `data:audio/mpeg;base64,${audioBase64}`,
      lipSync,
      duration: estimatedDuration // ارسال مدت زمان به فرانت‌اند
    });


function generateLipSync(durationInSeconds) {
  const lipSync = [];
  let isOpen = false;
  
  // گام زمانی مناسب برای lipSync
  const stepTime = 0.12; // 120ms
  
  // تعداد مراحل بر اساس مدت زمان
  const steps = Math.ceil(durationInSeconds / stepTime);
  
  for (let i = 0; i < steps; i++) {
    const time = i * stepTime;
    
    // اگر زمان از duration بیشتر شد، متوقف شو
    if (time >= durationInSeconds) break;
    
    // تغییر حالت دهان
    if (Math.random() > 0.3) {
      isOpen = !isOpen;
    }
    
    lipSync.push({
      time: time,
      mouth: isOpen ? 'open' : 'closed',
      // اضافه کردن intensity برای انیمیشن نرم‌تر
      intensity: isOpen ? 0.8 + Math.random() * 0.2 : 0.1
    });
  }

    return lipSync;
}
    }

module.exports = { lipSyncMock };
