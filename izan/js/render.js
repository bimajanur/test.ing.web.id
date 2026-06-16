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

// Helper: Render satu sisi kolom (Kiri / Kanan) untuk spread cerita/kuis
function renderColumnHTML(colData, side, spreadIndex) {
  if (!colData) return '';

  switch (colData.type) {
    case 'story-image':
      return `
        <div class="illustration-container" style="width: 100%; height: 100%;">
          ${renderImageOrPlaceholder(colData.image, colData.alt || "Ilustrasi cerita")}
        </div>
      `;

    case 'story-text':
      return `
        <div class="story-column-content" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; width: 100%; align-items: center;">
          <div class="story-text-container" style="width: 100%; margin-bottom: 20px;">
            <div class="story-text" style="width: 100%;">${colData.text}</div>
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
function renderSpreadHTML(spread, index) {
  if (!spread) return '';

  // Handle Animasi Melambai (Waving) first so it can be used as cover or any other page
  if (spread.type === 'waving-animation') {
    return `
      <div class="page-spread-container waving-animation-spread" style="background: ${spread.bgColor || '#FFFDF7'}; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; box-sizing: border-box; position: relative; overflow: hidden;">
        <div class="waving-container" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; padding: 0; box-sizing: border-box;">
          <img src="${spread.bgImage}" class="full-bleed-image" style="position: absolute; top: 0; left: 0; z-index: 2;" onerror="handleImageError(this, '${spread.bgImage}')">
          <img src="${spread.handImage}" class="waving-hand-anim" style="position: absolute; top: ${spread.handTop || '50%'}; left: ${spread.handLeft || '50%'}; width: ${spread.handWidth || '150px'}; z-index: 1; transform-origin: ${spread.handOrigin || 'bottom right'};" onerror="handleImageError(this, '${spread.handImage}')">
        </div>
        <div class="full-image-text" style="position: absolute; z-index: 3; background: rgba(255, 255, 255, 0.9); padding: 20px 40px; border-radius: 20px; text-align: center; border: 4px dashed var(--color-primary); box-shadow: 0 10px 20px rgba(0,0,0,0.15); display: ${spread.text ? 'block' : 'none'}; bottom: 50px;">
          <h2 style="font-family: var(--font-title); font-size: 2.5rem; color: var(--color-wood); margin: 0; animation: bounce 2s infinite alternate;">${spread.text || ''}</h2>
        </div>
      </div>
    `;
  }



  // 2. Sampul Belakang (Spread Terakhir)
  if (index === state.totalSpreads - 1) {
    return `
      <div class="page-content back-cover-page-unified" style="background: radial-gradient(circle, #FFFDE8 0%, ${spread.bgColorLeft || '#FFB26B'} 100%); width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box; padding: 40px; text-align: center;">
        <h2 class="back-cover-title">${spread.left.title}</h2>
        <p class="back-cover-text">${spread.left.message}</p>
        <button class="bouncy-btn" style="margin-top: 30px; padding: 15px 30px; font-family: var(--font-title); font-size: 1.5rem; background-color: var(--color-primary); color: white; border: none; border-radius: 50px; cursor: pointer; box-shadow: 0 6px 0 rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.15); transition: transform 0.2s;" onclick="goToFirstPage()" onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1)'" onmouseleave="this.style.transform='scale(1)'">
          🏠 Baca Ulang Cerita
        </button>
      </div>
    `;
  }

  // 3. Halaman Full Image
  if (spread.type === 'full-image') {
    return `
      <div class="page-spread-container full-image-spread" style="background: ${spread.bgColor || '#FFFDF7'}; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; box-sizing: border-box; position: relative; overflow: hidden;">
        <div class="full-image-wrapper" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; padding: 0; box-sizing: border-box;">
          ${renderImageOrPlaceholder(spread.image, spread.text, 'full-bleed-image')}
        </div>
        <div class="full-image-text" style="position: absolute; z-index: 2; background: rgba(255, 255, 255, 0.9); padding: 20px 40px; border-radius: 20px; text-align: center; border: 4px dashed var(--color-primary); box-shadow: 0 10px 20px rgba(0,0,0,0.15); display: ${spread.text ? 'block' : 'none'};">
          <h2 style="font-family: var(--font-title); font-size: 2.5rem; color: var(--color-wood); margin: 0; animation: bounce 2s infinite alternate;">${spread.text}</h2>
        </div>
      </div>
    `;
  }

  // 4. Halaman Cerita / Kuis Standar (Tata letak kolom 50/50)
  const leftHTML = renderColumnHTML(spread.left, 'left', index);
  const rightHTML = renderColumnHTML(spread.right, 'right', index);
  const bgStyle = `background: linear-gradient(135deg, ${spread.bgColorLeft || '#FFFDF7'} 0%, ${spread.bgColorRight || '#FFFDF7'} 100%);`;

  return `
    <div class="page-spread-container" style="${bgStyle} width: 100%; height: 100%; display: flex; box-sizing: border-box; position: relative;">
      <div class="page-column page-column-left" style="width: 50%; height: 100%; box-sizing: border-box; display: flex; justify-content: center; align-items: center; padding: 30px;">
        ${leftHTML}
      </div>
      <div class="page-column page-column-right" style="width: 50%; height: 100%; box-sizing: border-box; display: flex; justify-content: center; align-items: center; padding: 30px; border-left: 4px dashed rgba(139, 90, 43, 0.15);">
        ${rightHTML}
      </div>
    </div>
  `;
}

// 8. Render Static Spread
function renderStaticSpread(index) {
  const spread = state.getSpreadAt(index);
  elements.pageSlotActive.innerHTML = renderSpreadHTML(spread, index);

  elements.btnPrev.disabled = index === 0;
  elements.btnNext.disabled = index === state.totalSpreads - 1;

  updateProgress(index);
}
