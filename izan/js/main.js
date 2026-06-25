function handleSoundToggle() {
  const isMuted = sounds.toggleMute();

  const soundOnIcon = elements.btnSound.querySelector('.sound-on-icon');
  const soundOffIcon = elements.btnSound.querySelector('.sound-off-icon');

  if (isMuted) {
    soundOnIcon.classList.add('hidden');
    soundOffIcon.classList.remove('hidden');
    elements.btnSound.setAttribute('aria-label', 'Aktifkan Suara');
  } else {
    soundOnIcon.classList.remove('hidden');
    soundOffIcon.classList.add('hidden');
    elements.btnSound.setAttribute('aria-label', 'Matikan Suara');
    sounds.playPop();
  }
}

// Initialize Event Listeners
function initEvents() {
  window.addEventListener('resize', handleResize);
  initProgressDrag();

  elements.btnNext.addEventListener('click', () => {
    navigateNext();
  });
  elements.btnPrev.addEventListener('click', () => {
    navigatePrev();
  });

  elements.btnSound.addEventListener('click', () => {
    handleSoundToggle();
  });

  elements.btnInfo.addEventListener('click', () => {
    sounds.playPop();
    elements.infoOverlay.classList.remove('hidden');
  });

  elements.btnCloseInfo.addEventListener('click', () => {
    sounds.playPop();
    elements.infoOverlay.classList.add('hidden');
  });

  // Welcome screen Start button
  elements.btnStart.addEventListener('click', () => {
    // Initialize audio context & enable sound by default
    sounds.init();
    sounds.toggleMute(); // Will unmute and set muted = false

    // Update toolbar icons
    const soundOnIcon = elements.btnSound.querySelector('.sound-on-icon');
    const soundOffIcon = elements.btnSound.querySelector('.sound-off-icon');
    soundOnIcon.classList.remove('hidden');
    soundOffIcon.classList.add('hidden');
    elements.btnSound.setAttribute('aria-label', 'Matikan Suara');

    sounds.playChime();

    elements.welcomeOverlay.classList.add('hidden');
  });

  // Support Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!elements.welcomeOverlay.classList.contains('hidden')) return;

    if (e.key === 'ArrowRight' || e.key === ' ') {
      navigateNext();
    } else if (e.key === 'ArrowLeft') {
      navigatePrev();
    }
  });
}

// Set Title dynamically from data
function initTitle() {
  const titleDisplay = document.getElementById('book-title-display');
  if (titleDisplay) titleDisplay.textContent = bookData.title;

  const welcomeTitle = document.querySelector('.welcome-card h2');
  if (welcomeTitle) welcomeTitle.textContent = bookData.title;


}

// Start Application
function startApp() {
  handleResize();
  initTitle();
  jumpToSpread(0);
  initEvents();
  setTimeout(preloadImages, 500);
  setTimeout(preloadAudio, 1000);
}

// Start once DOM is ready
document.addEventListener('DOMContentLoaded', startApp);

// Preload functions have been moved to preload.js
// Drag and Drop logic has been moved to drag-drop.js

window.triggerGameWinCelebration = function (feedbackElement, feedbackText) {
  if (feedbackElement) {
    feedbackElement.innerHTML = `
      <div style="color: var(--color-grass-dark); animation: bounce 1s infinite alternate;">🎉 ${feedbackText}</div>
    `;
    feedbackElement.classList.remove('hidden');
    feedbackElement.classList.add('feedback-celebration-anim');
  }

  if (typeof sounds !== 'undefined' && sounds.playChime) {
    sounds.playChime();
  } else if (typeof sounds !== 'undefined' && sounds.playSuccess) {
    sounds.playSuccess();
  }

  if (typeof confetti === 'function') {
    var duration = 4 * 1000;
    var end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#4E9F3D', '#FFD700', '#FF8E8E', '#83BD75']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#4E9F3D', '#FFD700', '#FF8E8E', '#83BD75']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
};
