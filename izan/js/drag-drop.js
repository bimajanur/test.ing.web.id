window.initDragDrop = function (container) {
  const draggables = container.querySelectorAll('.draggable-item');
  const dropZone = container.querySelector('.drop-zone-container');
  const dropZoneImg = container.querySelector('#drop-zone-img');

  if (!draggables.length || !dropZone || !dropZoneImg) return;

  let feedbackTimeout = null;

  draggables.forEach(item => {
    let isDragging = false;
    let startX, startY;
    let currentX = 0;
    let currentY = 0;

    const handleStart = (e) => {
      isDragging = true;
      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

      startX = clientX - currentX;
      startY = clientY - currentY;

      item.style.zIndex = 1000;
      item.style.transition = 'none'; // remove transition while dragging
      item.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.1) rotate(35deg)`;
      item.style.cursor = 'grabbing';
    };

    const handleMove = (e) => {
      if (!isDragging) return;
      e.preventDefault(); // prevent scrolling

      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

      currentX = clientX - startX;
      currentY = clientY - startY;

      item.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.1) rotate(35deg)`;
    };

    const handleEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;

      item.style.transition = 'transform 0.3s ease';
      item.style.zIndex = 10;
      item.style.cursor = 'grab';

      // Check collision with drop zone
      const itemRect = item.getBoundingClientRect();
      const dropRect = dropZone.getBoundingClientRect();

      // Expand drop zone slightly for easier drop
      const isColliding = !(
        itemRect.right < dropRect.left - 20 ||
        itemRect.left > dropRect.right + 20 ||
        itemRect.bottom < dropRect.top - 20 ||
        itemRect.top > dropRect.bottom + 20
      );

      if (isColliding) {
        if (item.dataset.correct === 'true') {
          // Success
          currentX = 0;
          currentY = 0;
          item.style.transform = `translate(0px, 0px) scale(1)`;

          dropZoneImg.src = dropZoneImg.dataset.doneSrc;

          if (typeof sounds !== 'undefined' && sounds.playChime) sounds.playChime();

          const feedback = container.querySelector('.drag-feedback');
          if (feedback) {
            if (feedbackTimeout) clearTimeout(feedbackTimeout);
            feedback.innerHTML = `<span style="color:var(--color-grass-dark)">${feedback.dataset.correctText}</span>`;
            feedback.classList.remove('hidden');
          }
        } else {
          // Incorrect
          currentX = 0;
          currentY = 0;
          item.style.transform = `translate(0px, 0px) scale(1)`;

          if (typeof sounds !== 'undefined' && sounds.playWrong) sounds.playWrong();

          const feedback = container.querySelector('.drag-feedback');
          if (feedback) {
            if (feedbackTimeout) clearTimeout(feedbackTimeout);
            feedback.innerHTML = `<span style="color:#C0392B">${feedback.dataset.incorrectText}</span>`;
            feedback.classList.remove('hidden');
            feedbackTimeout = setTimeout(() => {
              feedback.classList.add('hidden');
            }, 3000);
          }
        }
      } else {
        // Snap back
        currentX = 0;
        currentY = 0;
        item.style.transform = `translate(0px, 0px) scale(1) rotate(35deg)`;
      }
    };

    item.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove, { passive: false });
    document.addEventListener('mouseup', handleEnd);

    item.addEventListener('touchstart', handleStart, { passive: false });
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
  });
};
