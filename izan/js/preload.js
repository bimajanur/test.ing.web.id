// Helper to recursively find asset paths in an object
function extractAssets(obj, regex) {
  let assets = [];
  if (typeof obj === 'string') {
    if (regex.test(obj)) {
      assets.push(obj);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach(item => {
      assets = assets.concat(extractAssets(item, regex));
    });
  } else if (typeof obj === 'object' && obj !== null) {
    for (let key in obj) {
      assets = assets.concat(extractAssets(obj[key], regex));
    }
  }
  return assets;
}

function preloadAudio() {
  if (typeof bookData === 'undefined' || !bookData.spreads) return;

  const audioRegex = /\.(mp3|wav|ogg|m4a)$/i;
  const audioToLoad = extractAssets(bookData.spreads, audioRegex);
  
  // Tambahkan musik latar secara manual karena tidak ada di dalam bookData.spreads
  audioToLoad.push('audio/music/bg-1.mp3');

  const uniqueAudio = [...new Set(audioToLoad.filter(Boolean))];

  uniqueAudio.forEach(src => {
    const audio = new Audio();
    audio.preload = 'auto'; // Menginstruksikan browser memuat data audio di background
    audio.src = src;
  });

  if (uniqueAudio.length > 0) {
    console.log(`Preloading ${uniqueAudio.length} file audio di latar belakang...`);
  }
}

function preloadImages() {
  if (typeof bookData === 'undefined' || !bookData.spreads) return;

  const imageRegex = /\.(png|jpe?g|webp|gif|svg)$/i;
  const imagesToLoad = extractAssets(bookData.spreads, imageRegex);

  const uniqueImages = [...new Set(imagesToLoad.filter(Boolean))];

  uniqueImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  if (uniqueImages.length > 0) {
    console.log(`Preloading ${uniqueImages.length} images di latar belakang...`);
  }
}
