window.initBoxOpeningGame = function (container) {
  const track = container.querySelector('#box-slider-track');
  const tapeContainer = container.querySelector('#box-tape-container');
  const flapTop = container.querySelector('#box-flap-top');
  const flapBottom = container.querySelector('#box-flap-bottom');
  const boxBgOpened = container.querySelector('#box-bg-opened');
  const feedback = container.querySelector('.drag-feedback');
  const nextBtn = container.querySelector('.next-level-btn');

  if (!tapeContainer || !track) return;

  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  // Use a smaller ratio to make it easier to reach the end
  let maxX = track.offsetWidth * 0.4;
  let isOpened = false;

  const handleStart = (e) => {
    if (isOpened) return;
    isDragging = true;
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    startX = clientX - currentX;

    track.style.transition = 'none';
    maxX = track.offsetWidth * 0.5; // require 50% drag
  };

  const handleMove = (e) => {
    if (!isDragging || isOpened) return;
    e.preventDefault();

    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    currentX = clientX - startX;

    // Constrain movement
    if (currentX < 0) currentX = 0;

    track.style.transform = `translateX(${currentX}px)`;

    // Check if reached the end
    if (currentX >= maxX) {
      openBox();
    }
  };

  const handleEnd = (e) => {
    if (!isDragging || isOpened) return;
    isDragging = false;

    if (currentX < maxX) {
      // Snap back if not fully dragged
      track.style.transition = 'transform 0.3s ease';
      currentX = 0;
      track.style.transform = `translateX(0px)`;
    }
  };

  const openBox = () => {
    isOpened = true;
    isDragging = false;

    // Play sound if available
    if (typeof sounds !== 'undefined' && sounds.playChime) sounds.playChime();

    // Hide tape and arrow container
    tapeContainer.style.opacity = '0';
    setTimeout(() => {
      tapeContainer.style.display = 'none';
    }, 300);

    // Animate flaps
    flapTop.classList.add('flap-open-top');
    flapBottom.classList.add('flap-open-bottom');

    // Show inner box
    boxBgOpened.classList.remove('hidden');
    boxBgOpened.style.opacity = '0';
    boxBgOpened.style.transition = 'opacity 0.8s ease';

    setTimeout(() => {
      boxBgOpened.style.opacity = '1';
    }, 200);

    // Show feedback and next button
    if (feedback) {
      feedback.innerHTML = `<span style="color:var(--color-grass-dark)">${feedback.dataset.correctText}</span>`;
      feedback.classList.remove('hidden');
    }
    if (nextBtn) {
      nextBtn.classList.remove('hidden');
    }
  };

  tapeContainer.addEventListener('mousedown', handleStart);
  document.addEventListener('mousemove', handleMove, { passive: false });
  document.addEventListener('mouseup', handleEnd);

  tapeContainer.addEventListener('touchstart', handleStart, { passive: false });
  document.addEventListener('touchmove', handleMove, { passive: false });
  document.addEventListener('touchend', handleEnd);
};
