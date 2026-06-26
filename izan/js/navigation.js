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

// Update Progress Bar & Page Number Indicator
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

// Navigasi Halaman Selanjutnya (Geser Kiri / Slide to Left)
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

    setTimeout(() => {
      if (window.initActiveGame) {
        window.initActiveGame(nextSpread, elements.pageSlotActive);
      }
    }, 50);
  }, 600); // Matches the CSS transform transition timing
}

// Navigasi Halaman Sebelumnya (Geser Kanan / Slide to Right)
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

    setTimeout(() => {
      if (window.initActiveGame) {
        window.initActiveGame(prevSpread, elements.pageSlotActive);
      }
    }, 50);
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

let isDraggingProgress = false;

function initProgressDrag() {
  const track = elements.progressTrack;
  const character = elements.progressCharacter;

  if (!track || !character) return;

  function calculatePageFromEvent(e) {
    const rect = track.getBoundingClientRect();
    let clientX = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : e.clientX;
    let percentage = (clientX - rect.left) / rect.width;
    
    if (percentage < 0) percentage = 0;
    if (percentage > 1) percentage = 1;

    const totalReadableSpreads = state.totalSpreads - 1;
    const maxIndex = totalReadableSpreads - 1;
    let pageIndex = Math.round(percentage * maxIndex);
    
    // Safety bounds
    if (pageIndex < 0) pageIndex = 0;
    if (pageIndex > maxIndex) pageIndex = maxIndex;
    
    return pageIndex;
  }

  function handleDragStart(e) {
    if (state.isTransitioning) return;
    isDraggingProgress = true;
    character.style.transition = 'none'; // Disable transition for smooth dragging
    elements.progressFill.style.transition = 'none';
  }

  function handleDragMove(e) {
    if (!isDraggingProgress) return;
    e.preventDefault(); // Prevent scrolling while dragging on touch devices
    
    const rect = track.getBoundingClientRect();
    let clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    character.style.left = `${percentage}%`;
    elements.progressFill.style.width = `${percentage}%`;
  }

  function handleDragEnd(e) {
    if (!isDraggingProgress) return;
    isDraggingProgress = false;
    
    character.style.transition = ''; // Restore CSS transitions
    elements.progressFill.style.transition = '';

    const touchOrMouse = e.changedTouches ? e.changedTouches[0] : e;
    const newPageIndex = calculatePageFromEvent(touchOrMouse);
    
    if (newPageIndex !== state.currentSpreadIndex) {
      sounds.playSwoosh();
      jumpToSpread(newPageIndex);
      // jumpToSpread calls updateProgress internally but let's make sure
      updateProgress(newPageIndex);
    } else {
      // Snap back if didn't change
      updateProgress(state.currentSpreadIndex);
    }
  }

  // Mouse Events
  character.addEventListener('mousedown', handleDragStart);
  window.addEventListener('mousemove', handleDragMove);
  window.addEventListener('mouseup', handleDragEnd);

  // Touch Events
  character.addEventListener('touchstart', handleDragStart, { passive: false });
  window.addEventListener('touchmove', handleDragMove, { passive: false });
  window.addEventListener('touchend', handleDragEnd);
  
  // Click on track to jump directly
  track.addEventListener('click', (e) => {
    if (state.isTransitioning || isDraggingProgress) return;
    const newPageIndex = calculatePageFromEvent(e);
    if (newPageIndex !== state.currentSpreadIndex) {
      sounds.playSwoosh();
      jumpToSpread(newPageIndex);
      updateProgress(newPageIndex);
    }
  });
}
