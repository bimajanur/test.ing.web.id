window.initDragDrop = function (container) {
  const draggables = container.querySelectorAll('.draggable-item');
  const dropZones = container.querySelectorAll('.drop-zone-container');
  const feedback = container.querySelector('.drag-feedback');
  const nextBtn = container.querySelector('.next-level-btn');

  if (!draggables.length || !dropZones.length) return;

  let feedbackTimeout = null;
  let completedZones = 0;
  const totalZones = dropZones.length;

  draggables.forEach(item => {
    let isDragging = false;
    let startX, startY;
    let currentX = 0;
    let currentY = 0;
    let hasSuccessfullyDropped = false;

    const handleStart = (e) => {
      if (hasSuccessfullyDropped && item.dataset.target === "") return; // Disable if already successfully used (unless it's a multi-use or single target missing)
      isDragging = true;
      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
      const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720) || 1;

      startX = clientX - (currentX * scale);
      startY = clientY - (currentY * scale);

      item.style.zIndex = 1000;
      item.style.transition = 'none'; // remove transition while dragging
      item.style.willChange = 'transform';
      item.style.pointerEvents = 'none';
      item.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.1) rotate(35deg)`;
      item.style.cursor = 'grabbing';
    };

    const handleMove = (e) => {
      if (!isDragging) return;
      e.preventDefault(); // prevent scrolling

      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
      const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720) || 1;

      currentX = (clientX - startX) / scale;
      currentY = (clientY - startY) / scale;

      item.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.1) rotate(35deg)`;
    };

    const handleEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;

      item.style.transition = 'transform 0.3s ease';
      item.style.willChange = 'auto';
      item.style.pointerEvents = 'auto';
      item.style.zIndex = 10;
      item.style.cursor = 'grab';

      // Check collision with any drop zone
      const itemRect = item.getBoundingClientRect();
      // Define collision area as the top-right quadrant of the item (the nozzle/tip of the bottle)
      const itemColLeft = itemRect.left + itemRect.width * 0.5;
      const itemColRight = itemRect.right;
      const itemColTop = itemRect.top;
      const itemColBottom = itemRect.top + itemRect.height * 0.5;

      let collidedZone = null;
      let matchingCollidedZone = null;

      for (const dropZone of dropZones) {
        const dropRect = dropZone.getBoundingClientRect();
        // Expand drop zone slightly for easier drop
        const isColliding = !(
          itemColRight < dropRect.left - 20 ||
          itemColLeft > dropRect.right + 20 ||
          itemColBottom < dropRect.top - 20 ||
          itemColTop > dropRect.bottom + 20
        );
        
        if (isColliding) {
          if (!collidedZone) collidedZone = dropZone; // keep the first one as fallback
          
          if ((item.dataset.target && item.dataset.target === dropZone.dataset.target) || 
              (!item.dataset.target && item.dataset.correct === 'true')) {
            matchingCollidedZone = dropZone;
            break;
          }
        }
      }

      // Prioritize the matching zone if overlapping multiple, otherwise just use the first collided zone to trigger the 'incorrect' feedback
      collidedZone = matchingCollidedZone || collidedZone;

      if (collidedZone) {
        // Validation check
        const isCorrectTarget = (item.dataset.target && item.dataset.target === collidedZone.dataset.target);
        const isLegacyCorrect = (!item.dataset.target && item.dataset.correct === 'true');
        
        if (isCorrectTarget || isLegacyCorrect) {
          // Success
          currentX = 0;
          currentY = 0;
          item.style.transform = `translate(0px, 0px) scale(1)`;

          // Mark specific bottle as used
          hasSuccessfullyDropped = true;

          const dropZoneImg = collidedZone.querySelector('.drop-zone-img') || collidedZone.querySelector('#drop-zone-img');
          if (dropZoneImg && !collidedZone.dataset.completed) {
            dropZoneImg.src = dropZoneImg.dataset.doneSrc;
            collidedZone.dataset.completed = "true";
            completedZones++;
            
            if (item.dataset.hideOnDrop === "true") {
              item.style.opacity = '0';
              item.style.pointerEvents = 'none';
            }
          }

          if (typeof sounds !== 'undefined' && sounds.playChime) sounds.playChime();

          if (feedback) {
            if (feedbackTimeout) clearTimeout(feedbackTimeout);
            feedback.innerHTML = `<span style="color:var(--color-grass-dark)">${feedback.dataset.correctText}</span>`;
            feedback.classList.remove('hidden');
            feedbackTimeout = setTimeout(() => {
              feedback.classList.add('hidden');
            }, 2000);
          }

          // Check if all zones completed
          if (completedZones >= totalZones) {
             if (nextBtn) {
               nextBtn.classList.remove('hidden');
             }
             if (window.triggerGameWinCelebration) {
               window.triggerGameWinCelebration(feedback, "Semua sudah sesuai! Hebat!");
             } else if (feedback) {
                feedback.innerHTML = `<span style="color:var(--color-grass-dark)">Semua warna sudah sesuai! Hebat!</span>`;
                feedback.classList.remove('hidden');
             }
          }

        } else {
          // Incorrect
          currentX = 0;
          currentY = 0;
          item.style.transform = `translate(0px, 0px) scale(1)`;

          if (typeof sounds !== 'undefined' && sounds.playWrong) sounds.playWrong();

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
        item.style.transform = `translate(0px, 0px) scale(1) rotate(0deg)`;
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
