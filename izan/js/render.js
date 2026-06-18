/**
 * INTERACTIVE CHILDREN'S BOOK - RENDER FUNCTIONS
 */

// Helper: Membuat penampung gambar JPG. Jika file gambar gagal dimuat (belum diletakkan di folder),
// tampilkan placeholder kartu lucu dengan instruksi meletakkan file gambar.
function renderImageOrPlaceholder(imageSrc, altText, customClass = 'page-jpg-image') {
  if (!imageSrc) return '';
  return `
    <img src="${imageSrc}" alt="${altText}" class="${customClass}" onerror="handleImageError(this, '${imageSrc}')">
    <div class="image-error-placeholder" style="${customClass === 'full-bleed-image' ? 'border-radius: 0; border: none;' : ''}">
      <span class="placeholder-emoji">📸</span>
      <span class="placeholder-text">Tempat Gambar</span>
      <span class="placeholder-filename">${imageSrc}</span>
    </div>
  `;
}

// Terpanggil ketika berkas JPG tidak ditemukan (belum ada di folder)
window.handleImageError = function (imgElement, src) {
  imgElement.style.display = 'none';
  const placeholder = imgElement.nextElementSibling;
  if (placeholder) {
    placeholder.style.display = 'flex';
  }
};

// Helper: Render speech bubbles array
function renderSpeechBubbles(bubbles) {
  if (!bubbles || bubbles.length === 0) return '';
  return bubbles.map(bubble => {
    const speechPosition = `top: ${bubble.top || '10%'}; left: ${bubble.left || '5%'}; right: ${bubble.right || 'auto'}; bottom: ${bubble.bottom || 'auto'}; z-index: 50;`;
    const balloonStyle = bubble.bgColor ? `background-color: ${bubble.bgColor};` : '';
    const btnStyle = bubble.btnColor ? `background-color: ${bubble.btnColor};` : '';

    const isHiddenText = bubble.hideText || false;
    const btnExtraStyle = isHiddenText ? "position: relative; top: 0; left: 0;" : "";

    const buttonHtml = `
      <button class="speech-play-btn" style="${btnStyle} ${btnExtraStyle}" onclick="playSpeechText('${bubble.text.replace(/'/g, "\\'").replace(/\n/g, " ")}', '${bubble.audio || ''}', this)">
        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" style="margin-left: 2px;">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>
    `;

    const contentHtml = isHiddenText ? buttonHtml : `
      <div class="speech-balloon" style="${balloonStyle}">
        ${buttonHtml}
        ${bubble.text.replace(/\n/g, '<br>')}
      </div>
    `;

    return `
      <div class="speech-balloon-container" style="${speechPosition}">
        ${contentHtml}
      </div>
    `;
  }).join('');
}

// Helper: Render satu sisi kolom (Kiri / Kanan) untuk spread cerita/kuis
function renderColumnHTML(colData, side, spreadIndex) {
  if (!colData) return '';

  switch (colData.type) {
    case 'story-image':
      const speechHtml = renderSpeechBubbles(colData.speechBubbles);

      return `
        <div class="illustration-container" style="width: 100%; height: 100%; position: relative;">
          ${renderImageOrPlaceholder(colData.image, colData.alt || "Ilustrasi cerita")}
          ${speechHtml}
        </div>
      `;

    case 'guide-list':
      const listItems = colData.items.map(item => `
        <div class="guide-item">
          <div class="guide-icon">
            <img src="${item.icon}" alt="Icon" onerror="handleImageError(this, '${item.icon}')" />
          </div>
          <span class="guide-text">${item.text}</span>
        </div>
      `).join('');

      return `
        <div class="story-column-content">
          <div class="guide-container story-text-container">
            <h3 class="guide-title">${colData.title}</h3>
            <div class="guide-list-wrapper">
              ${listItems}
            </div>
          </div>
        </div>
      `;

    case 'story-text':
      return `
        <div class="story-column-content">
          <div class="story-text-container">
            <div class="story-text">${colData.text}</div>
          </div>
        </div>
      `;

    case 'quiz-question':
      return `
        <div class="quiz-question-column" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; width: 100%; align-items: center;">
          <div class="quiz-question-container" style="width: 100%;">
            <span class="quiz-badge">KUIS HARI RAYA 🤔</span>
            <p class="quiz-question-text" style="font-size: 1.4rem; line-height: 2rem;">${colData.question}</p>
          </div>
          <div class="illustration-container quiz-image-holder" style="width: 100%; height: 210px; margin-top: 15px;">
            ${renderImageOrPlaceholder(colData.image, "Pertanyaan Kuis")}
          </div>
        </div>
      `;

    case 'quiz-options':
      const pageIndex = spreadIndex + 1;
      const optionsHtml = colData.options.map((opt, idx) => {
        return `
          <button class="quiz-option-btn bouncy-btn" onclick="handleQuizAnswer(${opt.correct}, this, ${pageIndex})">
            ${opt.text}
          </button>
        `;
      }).join('');

      return `
        <div class="quiz-options-column quiz-options-page" style="display: flex; flex-direction: column; justify-content: center; height: 100%; width: 100%; align-items: center;">
          <div class="quiz-options-container" style="width: 100%;">
            ${optionsHtml}
          </div>
          
          <!-- Speech feedback container -->
          <div class="quiz-feedback-bubble hidden" id="quiz-feedback-${pageIndex}" style="width: 100%; margin-top: 20px; box-sizing: border-box;">
            <div class="feedback-triangle"></div>
            <p class="quiz-feedback-text" style="font-size: 1rem; line-height: 1.4rem;"></p>
          </div>
        </div>
      `;

    default:
      return '';
  }
}

// Render HTML untuk Halaman Tunggal 16:9 berdasarkan spread data
// Helper Render Functions for different spread types

function renderWavingSpread(spread) {
  const speechHtml = renderSpeechBubbles(spread.speechBubbles);

  return `
    <div class="spread-waving" style="background: ${spread.bgColor || '#FFFDF7'};">
      <div class="spread-waving-bg">
        <img src="${spread.bgImage}" class="full-bleed-image" onerror="handleImageError(this, '${spread.bgImage}')">
        <img src="${spread.handImage}" class="spread-waving-hand waving-hand-anim" style="top: ${spread.handTop || '50%'}; left: ${spread.handLeft || '50%'}; width: ${spread.handWidth || '150px'}; transform-origin: ${spread.handOrigin || 'bottom right'};" onerror="handleImageError(this, '${spread.handImage}')">
      </div>
      ${speechHtml}
      <div class="spread-text-overlay spread-text-overlay-bottom" style="display: ${spread.text ? 'block' : 'none'};">
        <h2 class="spread-text-title">${spread.text || ''}</h2>
      </div>
    </div>
  `;
}

function renderBackCoverSpread(spread) {
  const bgStyle = spread.bgColorLeft ? `background: radial-gradient(circle, #FFFDE8 0%, ${spread.bgColorLeft} 100%);` : '';
  
  return `
    <div class="spread-back-cover" style="${bgStyle}">
      <h2 class="back-cover-title">${spread.left.title}</h2>
      <p class="back-cover-text">${spread.left.message}</p>
      <div style="margin-top: 30px; animation: float-avatar 3s ease-in-out infinite alternate;">
        <button class="start-btn bouncy-btn" onclick="goToFirstPage(); if (typeof sounds !== 'undefined' && sounds.playPop) sounds.playPop();">
           📙 Baca Ulang Cerita
        </button>
      </div>
    </div>
  `;
}

function renderFullImageSpread(spread) {
  const speechHtml = renderSpeechBubbles(spread.speechBubbles);

  return `
    <div class="spread-full-image" style="background: ${spread.bgColor || '#FFFDF7'};">
      <div class="spread-full-image-wrapper">
        ${renderImageOrPlaceholder(spread.image, spread.text, 'full-bleed-image')}
      </div>
      ${speechHtml}
      <div class="spread-text-overlay" style="display: ${spread.text && !spread.speechText ? 'block' : 'none'};">
        <h2 class="spread-text-title">${spread.text}</h2>
      </div>
    </div>
  `;
}

function renderGameSpread(spread) {
  const draggablesHtml = spread.draggables.map(d => `
    <img src="${d.src}" class="draggable-item" data-id="${d.id}" data-target="${d.target || ''}" data-correct="${d.correct || false}"
         draggable="false" onerror="handleImageError(this, '${d.src}')">
  `).join('');

  const speechHtml = renderSpeechBubbles(spread.speechBubbles);
  const introSpeechHtml = spread.introSpeechBubbles ? renderSpeechBubbles(spread.introSpeechBubbles) : '';

  const introHtml = spread.introImage ? `
    <div class="game-intro-overlay" style="background: ${spread.bgColor || '#FFFDF7'};">
      <img src="${spread.introImage}" class="game-intro-bg" onerror="handleImageError(this, '${spread.introImage}')">
      ${introSpeechHtml}
      <div class="game-intro-btn-wrapper">
        <div class="game-intro-btn-anim">
          <button class="start-btn bouncy-btn" onclick="const popup = this.closest('.spread-game').querySelector('.game-popup-overlay'); if(popup){ document.getElementById('app-container').appendChild(popup); popup.classList.remove('hidden'); popup.style.display='flex'; } if (typeof sounds !== 'undefined' && sounds.playPop) sounds.playPop();">
            Mulai Main ➔
          </button>
        </div>
      </div>
    </div>
  ` : '';

  const dropZonesHtml = spread.dropZones ? spread.dropZones.map(dz => `
    <div class="drop-zone-container drop-zone-item" data-target="${dz.id}">
      ${dz.decoration ? `<img src="${dz.decoration.src}" class="${dz.decoration.className || ''}" style="${dz.decoration.style || ''}" onerror="handleImageError(this, '${dz.decoration.src}')">` : ''}
      <img src="${dz.startSrc}" class="drop-zone-img" data-done-src="${dz.doneSrc}" onerror="handleImageError(this, '${dz.startSrc}')">
    </div>
  `).join('') : `
    <div class="drop-zone-container drop-zone-item">
      ${spread.dropZone.decoration ? `<img src="${spread.dropZone.decoration.src}" class="${spread.dropZone.decoration.className || ''}" style="${spread.dropZone.decoration.style || ''}" onerror="handleImageError(this, '${spread.dropZone.decoration.src}')">` : ''}
      <img src="${spread.dropZone.startSrc}" class="drop-zone-img" data-done-src="${spread.dropZone.doneSrc}" onerror="handleImageError(this, '${spread.dropZone.startSrc}')">
    </div>
  `;

  return `
    <div class="spread-game" style="background: ${spread.bgColor || '#FFFDF7'};">
      ${introHtml}
      
      <!-- The Game Popup Overlay -->
      <div class="game-popup-overlay hidden" style="display: none;">
        <div class="game-popup-content" style="background: ${spread.bgColor || '#FFFDF7'};">
          
          <button class="game-btn-close bouncy-btn" onclick="const popup = this.closest('.game-popup-overlay'); popup.style.display='none'; popup.classList.add('hidden'); const container = document.querySelector('.spread-game'); if(container) { container.appendChild(popup); } else { popup.remove(); } if (typeof sounds !== 'undefined' && sounds.playPop) sounds.playPop();">X</button>

          ${speechHtml}
          <div class="story-text-container game-title-wrapper">
            <h2 class="game-title">
              ${spread.title.replace(/\n/g, '<br>')}
              ${spread.subtitle ? `<span class="game-subtitle">${spread.subtitle}</span>` : ''}
            </h2>
          </div>
          <div class="game-layout">
            <div class="drag-items-container drag-items-list">
               ${draggablesHtml}
            </div>
            <div class="drop-zones-wrapper drop-zones-list">
              ${dropZonesHtml}
            </div>
          </div>
          <div class="drag-feedback game-feedback hidden" data-correct-text="${spread.feedbackCorrect}" data-incorrect-text="${spread.feedbackIncorrect}"></div>
          
          <button class="next-level-btn game-btn-next bouncy-btn hidden" onclick="const popup = this.closest('.game-popup-overlay'); popup.style.display='none'; popup.classList.add('hidden'); elements.btnNext.click(); if (typeof sounds !== 'undefined' && sounds.playPop) sounds.playPop();">Lanjut ➔</button>
        </div>
      </div>
    </div>
  `;
}

function renderStandardSpread(spread, index) {
  const leftHTML = renderColumnHTML(spread.left, 'left', index);
  const rightHTML = renderColumnHTML(spread.right, 'right', index);
  const bgStyle = `background: linear-gradient(135deg, ${spread.bgColorLeft || '#FFFDF7'} 0%, ${spread.bgColorRight || '#FFFDF7'} 100%);`;

  return `
    <div class="spread-split" style="${bgStyle}">
      <div class="page-column page-column-left spread-split-col">
        ${leftHTML}
      </div>
      <div class="page-column page-column-right spread-split-col spread-split-col-right">
        ${rightHTML}
      </div>
    </div>
  `;
}

// Render HTML untuk Halaman Tunggal 16:9 berdasarkan spread data
function renderSpreadHTML(spread, index) {
  if (!spread) return '';

  // 1. Sampul Depan / Waving Animation
  if (spread.type === 'waving-animation') {
    return renderWavingSpread(spread);
  }

  // 2. Sampul Belakang (Spread Terakhir)
  if (index === state.totalSpreads - 1) {
    return renderBackCoverSpread(spread);
  }

  // 3. Halaman Full Image
  if (spread.type === 'full-image') {
    return renderFullImageSpread(spread);
  }

  // 4. Halaman Game Drag Drop
  if (spread.type === 'drag-drop-game') {
    return renderGameSpread(spread);
  }

  // 5. Halaman Cerita / Kuis Standar (Tata letak kolom 50/50)
  return renderStandardSpread(spread, index);
}

// 8. Render Static Spread
function renderStaticSpread(index) {
  const spread = state.getSpreadAt(index);
  elements.pageSlotActive.innerHTML = renderSpreadHTML(spread, index);

  elements.btnPrev.disabled = index === 0;
  elements.btnNext.disabled = index === state.totalSpreads - 1;

  updateProgress(index);

  if (spread.type === 'drag-drop-game') {
    setTimeout(() => {
      if (window.initDragDrop) {
        window.initDragDrop(elements.pageSlotActive);
      }
    }, 100);
  }
}

let currentPlayingAudio = null;
let currentPlayingBtn = null;
const PLAY_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" style="margin-left: 2px;"><path d="M8 5v14l11-7z"/></svg>`;
const STOP_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M6 6h12v12H6z"/></svg>`;

// 9. Play Speech Text Function
window.playSpeechText = function (text, audioSrc, btnElement) {
  // Selalu hentikan suara synthesis yang sedang berjalan
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // Jika ada audio MP3 yang sedang berjalan, hentikan
  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    currentPlayingAudio.currentTime = 0;
  }

  // Kembalikan tombol sebelumnya ke icon play dan aktifkan navigasi
  if (currentPlayingBtn) {
    currentPlayingBtn.innerHTML = PLAY_ICON;
    elements.btnPrev.disabled = state.currentSpreadIndex === 0;
    elements.btnNext.disabled = state.currentSpreadIndex === state.totalSpreads - 1;
  }

  // Jika user menekan tombol yang sama yang sedang berjalan (untuk stop), langsung keluar
  if (currentPlayingBtn === btnElement) {
    currentPlayingAudio = null;
    currentPlayingBtn = null;
    return;
  }

  // Update status tombol baru menjadi stop dan matikan navigasi
  if (btnElement) {
    btnElement.innerHTML = STOP_ICON;
    elements.btnPrev.disabled = true;
    elements.btnNext.disabled = true;
    currentPlayingBtn = btnElement;
  }

  const handleAudioEnd = () => {
    if (currentPlayingBtn === btnElement && btnElement) {
      btnElement.innerHTML = PLAY_ICON;
      elements.btnPrev.disabled = state.currentSpreadIndex === 0;
      elements.btnNext.disabled = state.currentSpreadIndex === state.totalSpreads - 1;
      currentPlayingBtn = null;
      currentPlayingAudio = null;
    }
  };

  // Jika ada path file audio, coba putar dulu
  if (audioSrc) {
    const audio = new Audio(audioSrc);
    currentPlayingAudio = audio;
    audio.onended = handleAudioEnd;

    audio.play().then(() => {
      // Pasang onerror hanya jika audio berhasil mulai diputar (bukan 404)
      audio.onerror = handleAudioEnd;
    }).catch(e => {
      console.warn("Gagal memutar audio MP3, beralih ke SpeechSynthesis:", e);
      fallbackToSpeechSynthesis(text, handleAudioEnd);
    });
  } else {
    // Jika tidak ada path audio, langsung ke fallback
    fallbackToSpeechSynthesis(text, handleAudioEnd);
  }
};

function fallbackToSpeechSynthesis(text, onEndCallback) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; // Indonesian
    utterance.rate = 0.9; // Sedikit lambat untuk anak-anak
    utterance.pitch = 1.1;

    if (onEndCallback) {
      utterance.onend = onEndCallback;
      utterance.onerror = onEndCallback;
    }

    window.speechSynthesis.speak(utterance);
  } else {
    alert("Maaf, browsermu tidak mendukung fitur suara.");
    if (onEndCallback) onEndCallback();
  }
}
