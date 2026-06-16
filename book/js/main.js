/**
 * INTERACTIVE CHILDREN'S BOOK - MAIN
 */

// 12. Sound Toolbar Controller
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

  elements.btnNext.addEventListener('click', () => {
    navigateNext();
  });
  elements.btnPrev.addEventListener('click', () => {
    navigatePrev();
  });

  elements.btnSound.addEventListener('click', () => {
    handleSoundToggle();
  });

  elements.btnHelp.addEventListener('click', () => {
    sounds.playPop();
    elements.helpOverlay.classList.remove('hidden');
  });

  elements.btnCloseHelp.addEventListener('click', () => {
    sounds.playPop();
    elements.helpOverlay.classList.add('hidden');
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
  renderStaticSpread(0);
  initEvents();
}

// Start once DOM is ready
document.addEventListener('DOMContentLoaded', startApp);
