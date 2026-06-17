function preloadAudio() {
  const audioToLoad = [];

  if (typeof bookData !== 'undefined' && bookData.spreads) {
    bookData.spreads.forEach(spread => {
      // Periksa audio di speechBubbles level spread
      if (spread.speechBubbles) {
        spread.speechBubbles.forEach(bubble => {
          if (bubble.audio) audioToLoad.push(bubble.audio);
        });
      }

      if (spread.introSpeechBubbles) {
        spread.introSpeechBubbles.forEach(bubble => {
          if (bubble.audio) audioToLoad.push(bubble.audio);
        });
      }

      // Periksa audio di left/right jika ada yang menggunakan speechBubbles
      if (spread.left && spread.left.speechBubbles) {
        spread.left.speechBubbles.forEach(bubble => {
          if (bubble.audio) audioToLoad.push(bubble.audio);
        });
      }
      if (spread.right && spread.right.speechBubbles) {
        spread.right.speechBubbles.forEach(bubble => {
          if (bubble.audio) audioToLoad.push(bubble.audio);
        });
      }
    });
  }

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
  const imagesToLoad = [];

  if (typeof bookData !== 'undefined' && bookData.spreads) {
    bookData.spreads.forEach(spread => {
      if (spread.image) imagesToLoad.push(spread.image);
      if (spread.introImage) imagesToLoad.push(spread.introImage);
      if (spread.left && spread.left.image) imagesToLoad.push(spread.left.image);
      if (spread.right && spread.right.image) imagesToLoad.push(spread.right.image);
      if (spread.bgImage) imagesToLoad.push(spread.bgImage);
      if (spread.handImage) imagesToLoad.push(spread.handImage);
      if (spread.left && spread.left.type === 'guide-list' && spread.left.items) {
        spread.left.items.forEach(item => { if (item.icon) imagesToLoad.push(item.icon); });
      }
      if (spread.right && spread.right.type === 'guide-list' && spread.right.items) {
        spread.right.items.forEach(item => { if (item.icon) imagesToLoad.push(item.icon); });
      }
      if (spread.type === 'drag-drop-game') {
        if (spread.dropZone) {
          if (spread.dropZone.startSrc) imagesToLoad.push(spread.dropZone.startSrc);
          if (spread.dropZone.doneSrc) imagesToLoad.push(spread.dropZone.doneSrc);
        }
        if (spread.draggables) {
          spread.draggables.forEach(d => { if (d.src) imagesToLoad.push(d.src); });
        }
      }
    });
  }

  // Filter nilai kosong dan hapus duplikat
  const uniqueImages = [...new Set(imagesToLoad.filter(Boolean))];

  // Fetch semua gambar ke cache browser secara asinkron
  uniqueImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  console.log(`Preloading ${uniqueImages.length} images di latar belakang...`);
}
