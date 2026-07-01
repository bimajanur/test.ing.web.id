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
    const speechPosition = `top: ${bubble.top || '10%'}; left: ${bubble.left || '5%'}; right: ${bubble.right || 'auto'}; bottom: ${bubble.bottom || 'auto'}; width: ${bubble.width || 'auto'}; z-index: 50;`;
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
    case 'story-image': {
      const speechHtml = renderSpeechBubbles(colData.speechBubbles);

      return `
        <div class="illustration-container" style="width: 100%; height: 100%; position: relative;">
          ${renderImageOrPlaceholder(colData.image, colData.alt || "Ilustrasi cerita")}
          ${speechHtml}
        </div>
      `;
    }

    case 'guide-list': {
      const speechHtml = renderSpeechBubbles(colData.speechBubbles);
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
          <div class="guide-container story-text-container" style="position: relative;">
            <h3 class="guide-title">${colData.title}</h3>
            <div class="guide-list-wrapper">
              ${listItems}
            </div>
            ${speechHtml}
          </div>
        </div>
      `;
    }

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
            <span class="quiz-badge">WAKTUNYA BERMAIN! 🎮</span>
            <p class="quiz-question-text" style="font-size: 1.4rem; line-height: 2rem;">${colData.question}</p>
          </div>
          <div class="illustration-container quiz-image-holder" style="width: 100%; height: 256px; margin-top: 15px;">
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

// Helper Render Functions for different spread types

function renderWavingSpread(spread) {
  const speechHtml = renderSpeechBubbles(spread.speechBubbles);

  return `
    <div class="spread-waving" style="background: ${spread.bgColor || '#FFFDF7'};">
      <div class="spread-waving-bg">
        ${spread.background.image ? `<img src="${spread.background.image}" style="top: ${spread.background.top || '50%'}; left: ${spread.background.left || '50%'}; width: ${spread.background.width || '150px'}; z-index: ${spread.background.zIndex || '3'};" onerror="handleImageError(this, '${spread.background.image}')">` : ''}
        ${spread.badan.image ? `<img src="${spread.badan.image}" class="spread-waving-position" style="top: ${spread.badan.top || '50%'}; left: ${spread.badan.left || '50%'}; width: ${spread.badan.width || '150px'}; z-index: ${spread.badan.zIndex || '3'};" onerror="handleImageError(this, '${spread.badan.image}')">` : ''}
        ${spread.leftHand.image ? `<img src="${spread.leftHand.image}" class="spread-waving-position waving-left-hand-anim" style="top: ${spread.leftHand.top || '50%'}; left: ${spread.leftHand.left || '50%'}; width: ${spread.leftHand.width || '150px'}; transform-origin: ${spread.leftHand.origin || 'bottom right'}; z-index: ${spread.leftHand.zIndex || '3'};" onerror="handleImageError(this, '${spread.leftHand.image}')">` : ''}
        ${spread.rightHand.image ? `<img src="${spread.rightHand.image}" class="spread-waving-position waving-right-hand-anim" style="top: ${spread.rightHand.top || '50%'}; left: ${spread.rightHand.left || '50%'}; width: ${spread.rightHand.width || '150px'}; transform-origin: ${spread.rightHand.origin || 'bottom right'}; z-index: ${spread.rightHand.zIndex || '2'};" onerror="handleImageError(this, '${spread.rightHand.image}')">` : ''}
      </div>
      ${speechHtml}
      ${spread.title ? `<div class="spread-text-overlay" style="display: ${spread.title ? 'block' : 'none'}; top: ${spread.title.top || '50px'}; left: ${spread.title.left || '50px'};">
        <h2 class="spread-text-title">${spread.title.text || ''}</h2>
      </div>` : ''}
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
  const draggablesHtml = spread.draggables.map(d => {
    let positionStyle = '';
    if (d.top || d.left || d.right || d.bottom || d.position) {
      positionStyle = `position: ${d.position || 'absolute'}; top: ${d.top || 'auto'}; left: ${d.left || 'auto'}; right: ${d.right || 'auto'}; bottom: ${d.bottom || 'auto'}; z-index: ${d.zIndex || 10};`;
    }
    return `
    <img src="${d.src}" class="draggable-item" data-id="${d.id}" data-target="${d.target || ''}" data-correct="${d.correct || false}" data-hide-on-drop="${d.hideOnDrop || false}"
         draggable="false" onerror="handleImageError(this, '${d.src}')" style="${positionStyle} ${d.style || ''}">
  `;
  }).join('');

  const speechHtml = renderSpeechBubbles(spread.speechBubbles);
  const introSpeechHtml = spread.introSpeechBubbles ? renderSpeechBubbles(spread.introSpeechBubbles) : '';

  const introHtml = spread.introImage ? `
    <div class="game-intro-overlay" style="background: ${spread.bgColor || '#FFFDF7'};">
      <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); z-index: 52;">
        <span class="quiz-badge">WAKTUNYA BERMAIN! 🎮</span>
      </div>
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

  const dropZonesHtml = spread.dropZones ? spread.dropZones.map(dz => {
    let positionStyle = '';
    if (dz.top || dz.left || dz.right || dz.bottom || dz.position) {
      positionStyle = `position: ${dz.position || 'absolute'}; top: ${dz.top || 'auto'}; left: ${dz.left || 'auto'}; right: ${dz.right || 'auto'}; bottom: ${dz.bottom || 'auto'}; z-index: ${dz.zIndex || 5};`;
    }
    return `
    <div class="drop-zone-container drop-zone-item" style="${positionStyle} ${dz.style || ''}" data-target="${dz.target || dz.id}" data-dynamic-src="${dz.dynamicSrc || false}">
      ${dz.decoration ? `<img src="${dz.decoration.src}" class="${dz.decoration.className || ''}" style="${dz.decoration.style || ''}" onerror="handleImageError(this, '${dz.decoration.src}')">` : ''}
      <img src="${dz.startSrc}" class="drop-zone-img" data-done-src="${dz.doneSrc}" onerror="handleImageError(this, '${dz.startSrc}')" style="${dz.imgStyle || ''}">
    </div>
  `;
  }).join('') : `
    <div class="drop-zone-container drop-zone-item" style="${spread.dropZone.style || ''}" data-target="${spread.dropZone.target || spread.dropZone.id || ''}" data-dynamic-src="${spread.dropZone.dynamicSrc || false}">
      ${spread.dropZone.decoration ? `<img src="${spread.dropZone.decoration.src}" class="${spread.dropZone.decoration.className || ''}" style="${spread.dropZone.decoration.style || ''}" onerror="handleImageError(this, '${spread.dropZone.decoration.src}')">` : ''}
      <img src="${spread.dropZone.startSrc}" class="drop-zone-img" data-done-src="${spread.dropZone.doneSrc}" onerror="handleImageError(this, '${spread.dropZone.startSrc}')" style="${spread.dropZone.imgStyle || ''}">
    </div>
  `;

  return `
    <div class="spread-game" style="background: ${spread.bgColor || '#FFFDF7'};">
      ${introHtml}
      
      <!-- The Game Popup Overlay -->
      <div class="game-popup-overlay hidden" style="display: none;">
        <div class="game-popup-content" style="background: ${spread.bgColor || '#FFFDF7'};">
          
          <button class="game-btn-close bouncy-btn" onclick="const popup = this.closest('.game-popup-overlay'); popup.remove(); if (typeof jumpToSpread !== 'undefined') { jumpToSpread(state.currentSpreadIndex); } if (typeof sounds !== 'undefined' && sounds.playPop) sounds.playPop();">X</button>

          ${speechHtml}
          <div class="game-title-wrapper" style="position: relative;">
            <button class="speech-play-btn game-title-play-btn" onclick="playSpeechText('${spread.title.replace(/'/g, "\\'").replace(/\n/g, " ")}', '${spread.titleAudio || ''}', this)">
              <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" style="margin-left: 2px;">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <h2 class="game-title">
              ${spread.title.replace(/\n/g, '<br>')}
              ${spread.subtitle ? `<span class="game-subtitle">${spread.subtitle}</span>` : ''}
            </h2>
          </div>
          <div class="game-layout" style="position: relative; ${spread.layoutBgImage ? `background-image: url('${spread.layoutBgImage}'); background-size: 100% 100%; background-position: center; background-repeat: no-repeat;` : ''} ${spread.layoutStyle || ''}">
            <div class="drag-items-container drag-items-list" style="${spread.dragItemsStyle || ''}">
               ${draggablesHtml}
            </div>
            <div class="drop-zones-wrapper drop-zones-list" style="${spread.dropZonesStyle || ''}">
              ${dropZonesHtml}
            </div>
            ${spread.type === 'pasang-burasa-game' && spread.tyingSteps ? `
            <!-- Tying Phase Container (hidden initially) -->
            <div id="tying-phase-container" class="hidden" style="position: absolute; top:0; left:0; width:100%; height:100%; z-index: 100; transition: opacity 0.5s ease; opacity: 0;">
               <div class="tying-container" style="position: absolute; top:50%; left:50%; transform:translate(-50%,-50%); width: 80%; max-width: 600px; aspect-ratio: 4/3;">
                   <img src="${spread.tyingBg}" class="tying-bg" draggable="false" style="width:100%; position:absolute; top:0; left:0;" onerror="handleImageError(this, '${spread.tyingBg}')">
                   <img src="${spread.tyingSteps[0].hintSrc}" class="tying-hint" id="tying-hint" draggable="false" style="width:100%; position:absolute; top:0; left:0; z-index: 2; pointer-events: none;" onerror="handleImageError(this, '${spread.tyingSteps[0].hintSrc}')">
                   <img src="" class="tying-result" id="tying-result" draggable="false" style="width:100%; position:absolute; top:0; left:0; z-index: 3; pointer-events: none; opacity: 0; transition: opacity 0.3s ease;">
                   
                   <!-- Layer to collect result images -->
                   <div id="tying-results-layer" style="position:absolute; top:0; left:0; width:100%; height:100%; z-index: 2; pointer-events: none;"></div>

                   <div class="tying-knob" id="tying-knob" style="position:absolute; width: 50px; height: 50px; background: rgba(255,165,0,0.5); border: 3px solid #ff9800; border-radius: 50%; z-index: 10; cursor: grab; transform: translate(-50%, -50%); top: ${spread.tyingSteps[0].startY}; left: ${spread.tyingSteps[0].startX}; box-shadow: 0 0 10px rgba(255,165,0,0.8); animation: pulse-knob 1.5s infinite;"></div>
               </div>
            </div>
            ` : ''}
          </div>
          <div class="drag-feedback game-feedback hidden" data-correct-text="${spread.feedbackCorrect}" data-incorrect-text="${spread.feedbackIncorrect}" data-correct-audio="${spread.feedbackCorrectAudio || ''}" data-incorrect-audio="${spread.feedbackIncorrectAudio || ''}" data-hide-speech-btn="${spread.hideFeedbackSpeechBtn === true ? 'true' : 'false'}"></div>

          <button class="next-level-btn game-btn-next bouncy-btn hidden" onclick="const popup = this.closest('.game-popup-overlay'); popup.remove(); elements.btnNext.click(); if (typeof sounds !== 'undefined' && sounds.playPop) sounds.playPop();">Lanjut ➔</button>
        </div>
      </div>
    </div>
  `;
}

function renderBoxOpeningGameSpread(spread) {
  const speechHtml = renderSpeechBubbles(spread.speechBubbles);
  const introSpeechHtml = spread.introSpeechBubbles ? renderSpeechBubbles(spread.introSpeechBubbles) : '';

  const introHtml = spread.introImage ? `
    <div class="game-intro-overlay" style="background: ${spread.bgColor || '#FFFDF7'};">
      <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); z-index: 52;">
        <span class="quiz-badge">WAKTUNYA BERMAIN! 🎮</span>
      </div>
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

  return `
    <div class="spread-game spread-box-opening" style="background: ${spread.bgColor || '#FFFDF7'};">
      ${introHtml}
      
      <!-- The Game Popup Overlay -->
      <div class="game-popup-overlay hidden" style="display: none;">
        <div class="game-popup-content" style="background: ${spread.bgColor || '#FFFDF7'};">
          
          <button class="game-btn-close bouncy-btn" onclick="const popup = this.closest('.game-popup-overlay'); popup.remove(); if (typeof jumpToSpread !== 'undefined') { jumpToSpread(state.currentSpreadIndex); } if (typeof sounds !== 'undefined' && sounds.playPop) sounds.playPop();">X</button>

          ${speechHtml}
          <div class="game-title-wrapper" style="position: relative;">
            <button class="speech-play-btn game-title-play-btn" onclick="playSpeechText('${spread.title.replace(/'/g, "\\'").replace(/\n/g, " ")}', '${spread.titleAudio || ''}', this)">
              <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" style="margin-left: 2px;">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <h2 class="game-title">
              ${spread.title.replace(/\n/g, '<br>')}
              ${spread.subtitle ? `<span class="game-subtitle">${spread.subtitle}</span>` : ''}
            </h2>
          </div>
          
          <div class="box-opening-layout">
            ${spread.nampah ? `
              <img src="${spread.nampah.image}" class="nampah-container" id="nampah-container" draggable="false" onerror="handleImageError(this, '${spread.nampah.image}')" style="
                ${spread.nampah.width ? `width: ${spread.nampah.width};` : ''}
                ${spread.nampah.top ? `top: ${spread.nampah.top};` : ''}
                ${spread.nampah.left ? `left: ${spread.nampah.left};` : ''}
                ${spread.nampah.aspectRatio ? `aspect-ratio: ${spread.nampah.aspectRatio};` : ''}
              ">
            ` : ''}

            <div class="box-container" id="box-container" style="
              ${spread.mainBox?.width ? `width: ${spread.mainBox.width};` : ''}
              ${spread.mainBox?.top ? `top: ${spread.mainBox.top};` : ''}
              ${spread.mainBox?.left ? `left: ${spread.mainBox.left};` : ''}
              ${spread.mainBox?.aspectRatio ? `aspect-ratio: ${spread.mainBox.aspectRatio};` : ''}
            ">
              <img src="${spread.mainBox.image}" class="box-bg hidden" id="box-bg-opened" draggable="false" onerror="handleImageError(this, '${spread.mainBox.image}')">
              
              <!-- Items inside the box -->
              ${spread.boxItems ? spread.boxItems.map((item, i) => `
                <img src="${item.image}" class="box-item hidden" id="box-item-${i}" data-full-image="${item.fullImage || ''}" draggable="false" onerror="handleImageError(this, '${item.image}')" style="
                  ${item.width ? `width: ${item.width};` : ''}
                  ${item.height ? `height: ${item.height};` : ''}
                  ${item.top ? `top: ${item.top};` : ''}
                  ${item.left ? `left: ${item.left};` : ''}
                  ${item.zIndex ? `z-index: ${item.zIndex};` : ''}
                ">
              `).join('') : ''}
              
              <div class="box-flap box-flap-top" id="box-flap-top" style="${spread.flapTop?.height ? `height: ${spread.flapTop.height};` : ''}">
                <img src="${spread.flapTop.image}" onerror="handleImageError(this, '${spread.flapTop.image}')">
              </div>
              <div class="box-flap box-flap-bottom" id="box-flap-bottom" style="${spread.flapBottom?.height ? `height: ${spread.flapBottom.height};` : ''}">
                <img src="${spread.flapBottom.image}" onerror="handleImageError(this, '${spread.flapBottom.image}')">
              </div>
              
              <div class="box-tape-container" id="box-tape-container" style="
                ${spread.tape?.width ? `width: ${spread.tape.width};` : ''}
                ${spread.tape?.top ? `top: ${spread.tape.top};` : ''}
                ${spread.tape?.left ? `left: ${spread.tape.left};` : ''}
                ${spread.tape?.aspectRatio ? `aspect-ratio: ${spread.tape.aspectRatio};` : ''}
              ">
                <img src="${spread.tape.image}" class="box-tape-img" draggable="false" onerror="handleImageError(this, '${spread.tape.image}')">
                <div class="box-slider-track" id="box-slider-track">
                  <img src="${spread.arrow.image}" class="box-slider-arrow" id="box-slider-arrow" draggable="false" onerror="handleImageError(this, '${spread.arrow.image}')" style="
                    ${spread.arrow?.height ? `height: ${spread.arrow.height};` : ''}
                    ${spread.arrow?.top ? `top: ${spread.arrow.top};` : ''}
                    ${spread.arrow?.left ? `left: ${spread.arrow.left};` : ''}
                  ">
                </div>
              </div>
            </div>
          </div>
          
          <div class="drag-feedback game-feedback hidden" data-correct-text="${spread.feedbackCorrect}" data-incorrect-text="${spread.feedbackIncorrect}" data-correct-audio="${spread.feedbackCorrectAudio || ''}" data-incorrect-audio="${spread.feedbackIncorrectAudio || ''}" data-drag-instruction="${spread.dragInstruction || ''}" data-hide-speech-btn="${spread.hideFeedbackSpeechBtn === true ? 'true' : 'false'}"></div>
          
          <button class="next-level-btn game-btn-next bouncy-btn hidden" onclick="const popup = this.closest('.game-popup-overlay'); popup.remove(); elements.btnNext.click(); if (typeof sounds !== 'undefined' && sounds.playPop) sounds.playPop();">Lanjut ➔</button>
        </div>
        
        <!-- Zoom Overlay -->
        <div class="zoom-overlay hidden" id="zoom-overlay" onclick="this.classList.add('hidden'); if (typeof sounds !== 'undefined' && sounds.playPop) sounds.playPop();">
          <button class="zoom-close-btn bouncy-btn">X</button>
          <img src="" class="zoom-image" id="zoom-image" alt="Zoomed item" onclick="event.stopPropagation();">
        </div>
      </div>
    </div>
  `;
}

function renderDrawingGameSpread(spread) {
  const speechHtml = renderSpeechBubbles(spread.speechBubbles);
  const introSpeechHtml = spread.introSpeechBubbles ? renderSpeechBubbles(spread.introSpeechBubbles) : '';

  const introHtml = spread.introImage ? `
    <div class="game-intro-overlay" style="background: ${spread.bgColor || '#FFFDF7'};">
      <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); z-index: 52;">
        <span class="quiz-badge">WAKTUNYA BERMAIN! 🎮</span>
      </div>
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

  return `
    <div class="spread-game spread-drawing-game" style="background: ${spread.bgColor || '#FFFDF7'};">
      ${introHtml}
      
      <!-- The Game Popup Overlay -->
      <div class="game-popup-overlay hidden" style="display: none;">
        <div class="game-popup-content" style="background: ${spread.bgColor || '#FFFDF7'};">
          
          <button class="game-btn-close bouncy-btn" onclick="const popup = this.closest('.game-popup-overlay'); popup.remove(); if (typeof jumpToSpread !== 'undefined') { jumpToSpread(state.currentSpreadIndex); } if (typeof sounds !== 'undefined' && sounds.playPop) sounds.playPop();">X</button>

          ${speechHtml}
          <div class="game-title-wrapper" style="position: relative;">
            <button class="speech-play-btn game-title-play-btn" onclick="playSpeechText('${spread.title.replace(/'/g, "\\'").replace(/\n/g, " ")}', '${spread.titleAudio || ''}', this)">
              <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" style="margin-left: 2px;">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <h2 class="game-title">
              ${spread.title.replace(/\n/g, '<br>')}
              ${spread.subtitle ? `<span class="game-subtitle">${spread.subtitle}</span>` : ''}
            </h2>
          </div>
          
          <div class="drawing-game-layout">
            <!-- Left: Drawing Area (Pan) -->
            <div class="drawing-area-container" style="${spread.styles?.drawingArea || ''}">
              ${spread.bottleImage ? `<img src="${spread.bottleImage}" class="drawing-bottle" draggable="false" onerror="handleImageError(this, '${spread.bottleImage}')" style="${spread.styles?.bottle || ''}">` : ''}
              <div class="drawing-pan" style="background-image: url('${spread.panImage}'); ${spread.styles?.pan || ''}">
                <canvas class="drawing-canvas" style="${spread.styles?.canvas || ''}"></canvas>
              </div>
            </div>
            
            <!-- Right: Plate Area -->
            <div class="plate-area-container" style="${spread.styles?.plateArea || ''}">
              <div style="position: relative;">
                <img src="${spread.plateImage}" class="drawing-plate" draggable="false" onerror="handleImageError(this, '${spread.plateImage}')" style="${spread.styles?.plate || ''}">
                <div class="plate-stack" style="${spread.styles?.plateStack || ''}"></div>
              </div>
              <button class="drawing-btn-finish bouncy-btn hidden" style="${spread.styles?.finishBtn || ''}">Pindahkan ke Talenan ➔</button>
            </div>
          </div>
          
          <div class="drag-feedback game-feedback hidden" data-correct-text="${spread.feedbackCorrect}" data-incorrect-text="${spread.feedbackIncorrect}" data-correct-audio="${spread.feedbackCorrectAudio || ''}" data-incorrect-audio="${spread.feedbackIncorrectAudio || ''}" data-hide-speech-btn="${spread.hideFeedbackSpeechBtn === true ? 'true' : 'false'}"></div>
          
          <button class="next-level-btn game-btn-next bouncy-btn hidden" onclick="const popup = this.closest('.game-popup-overlay'); popup.remove(); elements.btnNext.click(); if (typeof sounds !== 'undefined' && sounds.playPop) sounds.playPop();">Lanjut ➔</button>
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

  // 4. Halaman Game Drag Drop / Susun Kue / Pasang Burasa
  if (spread.type === 'warna-kolang-kaling-game' || spread.type === 'susun-kue-game' || spread.type === 'pasang-burasa-game') {
    return renderGameSpread(spread);
  }

  // 4.5. Halaman Game Menggambar Bebas
  if (spread.type === 'drawing-game') {
    return renderDrawingGameSpread(spread);
  }

  // 4.6. Halaman Game Buka Kardus
  if (spread.type === 'box-opening-game') {
    return renderBoxOpeningGameSpread(spread);
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

  setTimeout(() => {
    if (window.initActiveGame) window.initActiveGame(spread, elements.pageSlotActive);
  }, 100);
}

let currentPlayingAudio = null;
let currentPlayingBtn = null;
const PLAY_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" style="margin-left: 2px;"><path d="M8 5v14l11-7z"/></svg>`;
const STOP_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M6 6h12v12H6z"/></svg>`;

// 9. Play Speech Text Function
window.stopSpeech = function () {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    currentPlayingAudio.currentTime = 0;
  }

  if (currentPlayingBtn) {
    currentPlayingBtn.innerHTML = PLAY_ICON;
    elements.btnPrev.disabled = state.currentSpreadIndex === 0;
    elements.btnNext.disabled = state.currentSpreadIndex === state.totalSpreads - 1;
  }

  currentPlayingAudio = null;
  currentPlayingBtn = null;
};

window.playSpeechText = function (text, audioSrc, btnElement) {
  // Jika user menekan tombol yang sama yang sedang berjalan (untuk stop), langsung hentikan dan keluar
  if (currentPlayingBtn === btnElement) {
    window.stopSpeech();
    return;
  }

  // Selalu hentikan suara yang sedang berjalan sebelumnya
  window.stopSpeech();

  // Mute Check: Jangan mainkan jika global sound di-mute
  if (typeof sounds !== 'undefined' && sounds.muted) {
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

window.initActiveGame = function (spread, container) {
  if (!spread || !container) return;

  if (spread.type === 'warna-kolang-kaling-game') {
    if (window.initDragDrop) window.initDragDrop(container, spread);
  } else if (spread.type === 'susun-kue-game') {
    if (window.initSusunKue) window.initSusunKue(container, spread);
  } else if (spread.type === 'pasang-burasa-game') {
    if (window.initPasangBurasaGame) window.initPasangBurasaGame(container, spread);
  } else if (spread.type === 'drawing-game') {
    if (window.initDrawingGame) window.initDrawingGame(container, spread);
  } else if (spread.type === 'box-opening-game') {
    if (window.initBoxOpeningGame) window.initBoxOpeningGame(container, spread);
  }
};
