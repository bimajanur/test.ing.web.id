window.initDrawingGame = function (container, config) {
  const canvas = container.querySelector('.drawing-canvas');
  const pan = container.querySelector('.drawing-pan');
  const btnFinish = container.querySelector('.drawing-btn-finish');
  const plateStack = container.querySelector('.plate-stack');
  const btnNext = container.querySelector('.game-btn-next');
  const feedback = container.querySelector('.game-feedback');

  if (!canvas || !pan) return;

  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let drawCount = 0;
  const maxDraws = config.maxDraws || 3;
  let hasDrawnCurrent = false;
  let points = [];
  let bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };

  function updateBounds(p) {
    if (p.x < bounds.minX) bounds.minX = p.x;
    if (p.x > bounds.maxX) bounds.maxX = p.x;
    if (p.y < bounds.minY) bounds.minY = p.y;
    if (p.y > bounds.maxY) bounds.maxY = p.y;
  }

  // Gunakan offscreen canvas untuk snapshot hardware-accelerated
  let offscreenCanvas = document.createElement('canvas');
  let offCtx = offscreenCanvas.getContext('2d');

  // Fungsi untuk menyesuaikan ukuran canvas dengan container (pan)
  function resizeCanvas() {
    const rect = pan.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return; // Abaikan jika masih hidden

    // Simpan gambar canvas sebelum resize (karena resize akan mereset context & gambar)
    let tempImage = null;
    if (hasDrawnCurrent) {
      tempImage = new Image();
      tempImage.src = canvas.toDataURL();
    }

    // Beri ukuran internal canvas yang sama dengan ukuran tampilannya
    canvas.width = rect.width;
    canvas.height = rect.height;

    offscreenCanvas.width = rect.width;
    offscreenCanvas.height = rect.height;

    // Reset style garis setiap resize
    setupContext();

    // Kembalikan gambar jika ada
    if (tempImage && tempImage.src) {
      tempImage.onload = () => {
        ctx.drawImage(tempImage, 0, 0, canvas.width, canvas.height);
      };
    }
  }

  function setupContext() {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // Gunakan perhitungan relatif agar proporsional dengan wajan
    ctx.lineWidth = config.lineWidth || Math.max(3, canvas.width * 0.02);

    const colors = config.drawColors || ['#F3C550'];
    const currentColor = colors[drawCount % colors.length];

    ctx.strokeStyle = currentColor;
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
  }

  // Gunakan ResizeObserver agar ukuran canvas otomatis benar saat popup muncul
  const resizeObserver = new ResizeObserver(() => {
    resizeCanvas();
  });
  resizeObserver.observe(pan);

  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = rect.width ? (canvas.width / rect.width) : 1;
    const scaleY = rect.height ? (canvas.height / rect.height) : 1;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  function startDrawing(e) {
    e.preventDefault(); // Mencegah scrolling saat menggambar
    if (drawCount >= maxDraws) return;

    isDrawing = true;
    hasDrawnCurrent = true;
    btnFinish.classList.remove('hidden');

    const p = getMousePos(e);
    points = [p];
    updateBounds(p);

    // Simpan status canvas (snapshot) ke offscreen canvas dengan cepat
    offCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    offCtx.drawImage(canvas, 0, 0);
  }

  function draw(e) {
    e.preventDefault();
    if (!isDrawing) return;

    const p = getMousePos(e);
    points.push(p);
    updateBounds(p);

    // Bersihkan canvas dan kembalikan ke snapshot dengan drawImage
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreenCanvas, 0, 0);

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    if (points.length < 3) {
      const p = points[1] || points[0];
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      return;
    }

    // Gunakan Quadratic Curves agar garis melengkung dengan mulus
    let i = 1;
    for (; i < points.length - 2; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    // Kurva untuk dua titik terakhir
    ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    ctx.stroke();
  }

  function stopDrawing(e) {
    if (!isDrawing) return;
    isDrawing = false;
  }

  // Event Listeners (Mouse)
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  // Event Listeners (Touch)
  canvas.addEventListener('touchstart', startDrawing, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', stopDrawing);
  canvas.addEventListener('touchcancel', stopDrawing);

  // Handler Tombol Selesai (Pindahkan ke Piring)
  btnFinish.addEventListener('click', () => {
    if (!hasDrawnCurrent) return; // Jangan pindahkan jika masih kosong

    if (typeof sounds !== 'undefined' && sounds.playPop) sounds.playPop();

    // 1. Ambil gambar dari canvas yang sudah di-crop ke bounding box-nya
    const pad = ctx.lineWidth ? ctx.lineWidth * 1.5 : 20;
    let cropX = Math.max(0, bounds.minX - pad);
    let cropY = Math.max(0, bounds.minY - pad);
    let cropW = Math.min(canvas.width - cropX, bounds.maxX - bounds.minX + pad * 2);
    let cropH = Math.min(canvas.height - cropY, bounds.maxY - bounds.minY + pad * 2);

    if (cropW <= 0 || cropH <= 0 || bounds.minX === Infinity) {
      cropX = 0; cropY = 0; cropW = canvas.width; cropH = canvas.height;
    }

    let cropCanvas = document.createElement('canvas');
    cropCanvas.width = cropW;
    cropCanvas.height = cropH;
    cropCanvas.getContext('2d').drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const dataUrl = cropCanvas.toDataURL('image/png');

    // 2. Buat elemen gambar baru
    const img = document.createElement('img');
    img.src = dataUrl;
    img.className = 'stacked-pancake';

    // // Atur ukuran kue di piring agar proporsional dengan ukuran asli di wajan
    // // Ini memastikan ketebalan garis tetap konsisten, baik menggambar besar atau kecil
    // const widthRatio = cropW / canvas.width;
    // img.style.width = (widthRatio * 100) + '%';
    // img.style.height = 'auto'; // Mencegah rasio gambar rusak

    // if (config.pancakeStyle) {
    //   // Tambahkan style dari config (misal top, left, transform) tanpa menimpa width
    //   img.style.cssText += ';' + config.pancakeStyle;
    // }

    if (config.styles?.pancake) {
      // Kita set style dasar dari config
      img.setAttribute('style', config.styles.pancake);
    }

    // Beri sedikit rotasi acak dan pergeseran agar terlihat natural bertumpuk
    const randomRotation = (Math.random() - 0.5) * 30; // -15 deg sampai +15 deg
    const randomX = (Math.random() - 0.5) * 20;
    const randomY = (Math.random() - 0.5) * 20;

    // Simpan transform awal jika ada dari config (misalnya scale atau translate khusus)
    const baseTransform = img.style.transform ? img.style.transform + ' ' : 'translate(-50%, -50%) ';
    img.style.transform = baseTransform + `rotate(${randomRotation}deg) translate(${randomX}px, ${randomY}px)`;

    // 3. Masukkan ke tumpukan piring
    plateStack.appendChild(img);

    // 4. Bersihkan canvas dan reset state
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawnCurrent = false;
    bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    btnFinish.classList.add('hidden');

    // 5. Tambah counter
    drawCount++;

    // 6. Update warna untuk giliran berikutnya
    setupContext();

    if (drawCount >= maxDraws) {
      // Game selesai
      endGame();
    }
  });

  function endGame() {
    // Sembunyikan pan dan tombol selesai
    pan.style.opacity = '0.5';
    pan.style.pointerEvents = 'none'; // Matikan interaksi canvas

    // Tampilkan tombol lanjut
    btnNext.classList.remove('hidden');

    if (window.triggerGameWinCelebration) {
      window.triggerGameWinCelebration(feedback, feedback.getAttribute('data-correct-text'));
    } else {
      // Tampilkan feedback benar
      feedback.textContent = feedback.getAttribute('data-correct-text');
      feedback.classList.remove('hidden');
      feedback.classList.add('feedback-correct');

      // Mainkan suara sukses
      if (typeof sounds !== 'undefined' && sounds.playSuccess) sounds.playSuccess();
    }
  }
};
