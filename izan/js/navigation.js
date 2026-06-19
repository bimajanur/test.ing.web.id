// Penskalaan Otomatis (720p Scale Lock)
function handleResize() {
  const targetWidth = 1280;
  const targetHeight = 720;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const scaleX = windowWidth / targetWidth;
  const scaleY = windowHeight / targetHeight;
  const scale = Math.min(scaleX, scaleY);

  elements.scaleWrapper.style.transform = `scale(${scale})`;
}

// 9. Update Progress Bar & Page Number Indicator
function updateProgress(index) {
  const isLastPage = index === state.totalSpreads - 1;
  const totalReadableSpreads = state.totalSpreads - 1;

  if (isLastPage) {
    elements.pageNumberDisplay.textContent = "Selesai";
  } else {
    const pageNumber = index + 1;
    elements.pageNumberDisplay.textContent = `Halaman ${pageNumber} dari ${totalReadableSpreads}`;
  }

  const percentage = Math.min((index / (totalReadableSpreads - 1)) * 100, 100);
  elements.progressFill.style.width = `${percentage}%`;
  elements.progressCharacter.style.left = `${percentage}%`;
}

// Trigger character walk animation
function triggerCharacterBounce() {
  elements.progressCharacter.classList.remove('walk-animation');
  void elements.progressCharacter.offsetWidth; // Force reflow
  elements.progressCharacter.classList.add('walk-animation');
}

// 10. Navigasi Halaman Selanjutnya (Geser Kiri / Slide to Left)
function navigateNext() {
  if (state.isTransitioning || state.currentSpreadIndex >= state.totalSpreads - 1) return;

  state.isTransitioning = true;
  sounds.playSwoosh();
  triggerCharacterBounce();

  const nextSpreadIndex = state.currentSpreadIndex + 1;
  const nextSpread = state.getSpreadAt(nextSpreadIndex);

  // Set content to transition slot (right slot)
  elements.pageSlotTransition.innerHTML = renderSpreadHTML(nextSpread, nextSpreadIndex);

  // Animate track translation sliding left
  elements.pageTrack.classList.add('track-transitioning');
  elements.pageTrack.style.transform = 'translateX(-50%)';

  setTimeout(() => {
    // Commit static changes to active slot
    elements.pageSlotActive.innerHTML = renderSpreadHTML(nextSpread, nextSpreadIndex);

    // Reset track position instantly without transitions
    elements.pageTrack.classList.remove('track-transitioning');
    elements.pageTrack.style.transform = 'translateX(0)';

    // Clear transition slot
    elements.pageSlotTransition.innerHTML = '';

    // Update state
    state.currentSpreadIndex = nextSpreadIndex;
    state.isTransitioning = false;

    elements.btnPrev.disabled = state.currentSpreadIndex === 0;
    elements.btnNext.disabled = state.currentSpreadIndex === state.totalSpreads - 1;
    updateProgress(state.currentSpreadIndex);

    if (state.currentSpreadIndex === state.totalSpreads - 1) {
      sounds.playChime();
    } else {
      sounds.playPop();
    }

    if (nextSpread.type === 'drag-drop-game') {
      setTimeout(() => {
        if (window.initDragDrop) window.initDragDrop(elements.pageSlotActive);
      }, 50);
    } else if (nextSpread.type === 'drawing-game') {
      setTimeout(() => {
        if (window.initDrawingGame) window.initDrawingGame(elements.pageSlotActive, nextSpread);
      }, 50);
    }
  }, 600); // Matches the CSS transform transition timing
}

// 11. Navigasi Halaman Sebelumnya (Geser Kanan / Slide to Right)
function navigatePrev() {
  if (state.isTransitioning || state.currentSpreadIndex <= 0) return;

  state.isTransitioning = true;
  sounds.playSwoosh();
  triggerCharacterBounce();

  const prevSpreadIndex = state.currentSpreadIndex - 1;
  const prevSpread = state.getSpreadAt(prevSpreadIndex);
  const currentSpread = state.getCurrentSpread();

  // Move current active view to the transition slot (right slot)
  elements.pageSlotTransition.innerHTML = renderSpreadHTML(currentSpread, state.currentSpreadIndex);
  // Set new active view into the active slot (left slot)
  elements.pageSlotActive.innerHTML = renderSpreadHTML(prevSpread, prevSpreadIndex);

  // Shift track to the right slot instantly to display the current content
  elements.pageTrack.classList.remove('track-transitioning');
  elements.pageTrack.style.transform = 'translateX(-50%)';

  // Force browser layout reflow to register instant position change
  void elements.pageTrack.offsetWidth;

  // Slide back leftwards to reveal active slot (left slot) with bounce
  elements.pageTrack.classList.add('track-transitioning');
  elements.pageTrack.style.transform = 'translateX(0)';

  setTimeout(() => {
    // Clear transition slot after animation finishes
    elements.pageSlotTransition.innerHTML = '';
    elements.pageTrack.classList.remove('track-transitioning');

    // Update state
    state.currentSpreadIndex = prevSpreadIndex;
    state.isTransitioning = false;

    elements.btnPrev.disabled = state.currentSpreadIndex === 0;
    elements.btnNext.disabled = state.currentSpreadIndex === state.totalSpreads - 1;
    updateProgress(state.currentSpreadIndex);

    sounds.playPop();

    if (prevSpread.type === 'drag-drop-game') {
      setTimeout(() => {
        if (window.initDragDrop) window.initDragDrop(elements.pageSlotActive);
      }, 50);
    } else if (prevSpread.type === 'drawing-game') {
      setTimeout(() => {
        if (window.initDrawingGame) window.initDrawingGame(elements.pageSlotActive, prevSpread);
      }, 50);
    }
  }, 600); // Matches the CSS transform transition timing
}

function jumpToSpread(spreadIndex) {
  state.currentSpreadIndex = spreadIndex;
  renderStaticSpread(spreadIndex);
}

function goToFirstPage() {
  if (state.isTransitioning) return;
  jumpToSpread(0);
  sounds.playPop();
}

