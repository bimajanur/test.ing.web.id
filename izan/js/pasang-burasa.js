window.initPasangBurasaGame = function (container, spread = {}) {
  const draggables = container.querySelectorAll('.draggable-item');
  const dropZones = container.querySelectorAll('.drop-zone-container');
  const feedback = container.querySelector('.drag-feedback');
  const nextBtn = container.querySelector('.next-level-btn');
  const tyingOverlay = container.querySelector('#tying-phase-container');
  const dragItemsList = container.querySelector('.drag-items-list');
  const dropZonesList = container.querySelector('.drop-zones-list');

  if (!draggables.length || !dropZones.length) return;

  if (feedback && spread.startInstruction) {
    const text = spread.startInstruction;
    window.showGameFeedback(feedback, `<span style="color:var(--color-wood-dark)">${text}</span>`, text, spread.startAudio, spread.hideStartSpeechBtn);
  }

  let feedbackTimeout = null;
  let completedZones = 0;
  // Exclude dummy drop zones from the total count
  const activeDropZones = Array.from(dropZones).filter(dz => dz.dataset.target !== 'dummy');
  const totalZones = activeDropZones.length;

  // Phase 2 State
  let currentTyingStep = 0;
  let tyingSteps = spread.tyingSteps || [];

  function initTyingPhase() {
    if (!tyingOverlay || tyingSteps.length === 0) {
      finishGame();
      return;
    }

    if (feedback) feedback.classList.add('hidden');

    // Fade out phase 1 items
    if (dragItemsList) {
      dragItemsList.style.transition = 'opacity 0.5s ease';
      dragItemsList.style.opacity = '0';
    }
    if (dropZonesList) {
      dropZonesList.style.transition = 'opacity 0.5s ease';
      dropZonesList.style.opacity = '0';
    }

    // Show tying phase container
    setTimeout(() => {
      if (dragItemsList) dragItemsList.classList.add('hidden');
      if (dropZonesList) dropZonesList.classList.add('hidden');
      
      tyingOverlay.classList.remove('hidden');
      setTimeout(() => {
        tyingOverlay.style.opacity = '1';
        setupTyingStep(currentTyingStep);
        
        if (feedback) {
          const text = spread.tyingInstruction || 'Ikuti arah panah';
          window.showGameFeedback(feedback, `<span style="color:var(--color-wood-dark)">${text}</span>`, text, spread.tyingAudio, spread.hideTyingSpeechBtn);
        }
      }, 50);
    }, 500);
  }

  function setupTyingStep(stepIndex) {
    if (stepIndex >= tyingSteps.length) {
      finishGame();
      // Remove the tying knob and hint to clean up the UI
      const hintImg = tyingOverlay.querySelector('#tying-hint');
      const knob = tyingOverlay.querySelector('#tying-knob');
      if (hintImg) hintImg.style.display = 'none';
      if (knob) knob.style.display = 'none';
      return;
    }

    const step = tyingSteps[stepIndex];
    const hintImg = tyingOverlay.querySelector('#tying-hint');
    let knob = tyingOverlay.querySelector('#tying-knob');
    
    // Clean up old listeners if they exist by replacing the node FIRST
    const newKnob = knob.cloneNode(true);
    knob.parentNode.replaceChild(newKnob, knob);
    knob = newKnob; // Now knob points to the active DOM element!

    hintImg.src = step.hintSrc;
    knob.style.left = step.startX;
    knob.style.top = step.startY;
    
    // Reset knob style
    knob.style.transform = 'translate(-50%, -50%) scale(1)';

    let isDraggingKnob = false;
    let knobStartX = 0, knobStartY = 0;

    const tyingContainer = tyingOverlay.querySelector('.tying-container');
    const containerRect = tyingContainer.getBoundingClientRect();

    // Convert end percentages to pixels relative to container for distance checking
    const parsePercent = (val) => parseFloat(val) / 100;
    const endX_px = parsePercent(step.endX) * containerRect.width;
    const endY_px = parsePercent(step.endY) * containerRect.height;
    const threshold = 40; // Pixel threshold for success

    const handleKnobStart = (e) => {
      isDraggingKnob = true;
      knob.style.animation = 'none'; // Stop pulse
      knob.style.transform = 'translate(-50%, -50%) scale(1.2)';
    };

    const handleKnobMove = (e) => {
      if (!isDraggingKnob) return;
      e.preventDefault();

      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
      
      const rect = tyingContainer.getBoundingClientRect();
      let x = clientX - rect.left;
      let y = clientY - rect.top;

      // Constrain within container
      x = Math.max(0, Math.min(x, rect.width));
      y = Math.max(0, Math.min(y, rect.height));

      knob.style.left = `${x}px`;
      knob.style.top = `${y}px`;

      // Check distance to end target
      const dist = Math.hypot(x - endX_px, y - endY_px);
      if (dist < threshold) {
        // Success for this step!
        isDraggingKnob = false;
        completeTyingStep();
      }
    };

    const handleKnobEnd = (e) => {
      if (!isDraggingKnob) return;
      isDraggingKnob = false;
      
      // If released but not close enough, snap back to start
      knob.style.animation = 'pulse-knob 1.5s infinite';
      knob.style.left = step.startX;
      knob.style.top = step.startY;
      knob.style.transform = 'translate(-50%, -50%) scale(1)';
    };
    
    knob.addEventListener('mousedown', handleKnobStart);
    document.addEventListener('mousemove', handleKnobMove, { passive: false });
    document.addEventListener('mouseup', handleKnobEnd);

    knob.addEventListener('touchstart', handleKnobStart, { passive: false });
    document.addEventListener('touchmove', handleKnobMove, { passive: false });
    document.addEventListener('touchend', handleKnobEnd);
  }

  function completeTyingStep() {
    const step = tyingSteps[currentTyingStep];
    const resultsLayer = tyingOverlay.querySelector('#tying-results-layer');
    
    // Add result image to layer
    const resultImg = document.createElement('img');
    resultImg.src = step.doneSrc;
    resultImg.style.width = '100%';
    resultImg.style.position = 'absolute';
    resultImg.style.top = '0';
    resultImg.style.left = '0';
    resultImg.style.zIndex = '3';
    resultsLayer.appendChild(resultImg);

    if (typeof sounds !== 'undefined' && sounds.playChime) sounds.playChime();

    currentTyingStep++;
    setupTyingStep(currentTyingStep);
  }

  function finishGame() {
    if (tyingOverlay) tyingOverlay.style.pointerEvents = 'none';
    if (nextBtn) {
      nextBtn.classList.remove('hidden');
    }
    if (window.triggerGameWinCelebration) {
      window.triggerGameWinCelebration(feedback, spread.feedbackTyingDone || "Wah hebat, semua burasa sudah diikat!", spread.hideCorrectSpeechBtn);
    }
  }


  draggables.forEach(item => {
    let isDragging = false;
    let startX, startY;
    let currentX = 0;
    let currentY = 0;
    let hasSuccessfullyDropped = false;

    const handleStart = (e) => {
      if (hasSuccessfullyDropped && item.dataset.target === "") return;
      isDragging = true;
      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
      const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720) || 1;

      startX = clientX - (currentX * scale);
      startY = clientY - (currentY * scale);

      item.style.zIndex = 1000;
      item.style.transition = 'none';
      item.style.willChange = 'transform';
      item.style.pointerEvents = 'none';
      item.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.1) rotate(35deg)`;
      item.style.cursor = 'grabbing';
    };

    const handleMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();

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

      const itemRect = item.getBoundingClientRect();
      const itemColLeft = itemRect.left + itemRect.width * 0.5;
      const itemColRight = itemRect.right;
      const itemColTop = itemRect.top;
      const itemColBottom = itemRect.top + itemRect.height * 0.5;

      let collidedZone = null;
      let matchingCollidedZone = null;

      for (const dropZone of dropZones) {
        if (dropZone.dataset.target === 'dummy') continue;

        const dropRect = dropZone.getBoundingClientRect();
        const isColliding = !(
          itemColRight < dropRect.left - 20 ||
          itemColLeft > dropRect.right + 20 ||
          itemColBottom < dropRect.top - 20 ||
          itemColTop > dropRect.bottom + 20
        );
        
        if (isColliding) {
          if (!collidedZone) collidedZone = dropZone;
          
          if ((item.dataset.target && item.dataset.target === dropZone.dataset.target) || 
              (!item.dataset.target && item.dataset.correct === 'true')) {
            matchingCollidedZone = dropZone;
            break;
          }
        }
      }

      collidedZone = matchingCollidedZone || collidedZone;

      if (collidedZone) {
        const isCorrectTarget = (item.dataset.target && item.dataset.target === collidedZone.dataset.target);
        const isLegacyCorrect = (!item.dataset.target && item.dataset.correct === 'true');
        
        if (isCorrectTarget || isLegacyCorrect) {
          currentX = 0;
          currentY = 0;
          item.style.transform = `translate(0px, 0px) scale(1)`;

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

          if (typeof sounds !== 'undefined' && sounds.playPop) sounds.playPop();

          if (completedZones >= totalZones) {
            // Show feedbackCorrect for Phase 1 completion
            if (feedback) {
              const text = spread.feedbackCorrect || 'Bagus!';
              window.showGameFeedback(feedback, `<span style="color:var(--color-grass-dark)">${text}</span>`, text, spread.feedbackCorrectAudio || spread.correctAudio, spread.hideCorrectSpeechBtn);
            }
            if (typeof sounds !== 'undefined' && sounds.playSuccess) sounds.playSuccess();

            // Trigger Phase 2 (Tying) after a delay to allow user to read feedback
            setTimeout(initTyingPhase, 2000);
          } else {
            // Show feedback for every successful drop before completion
            if (feedback) {
              if (feedbackTimeout) clearTimeout(feedbackTimeout);
              const text = spread.feedbackDrop || 'Hap!';
              window.showGameFeedback(feedback, `<span style="color:var(--color-grass-dark)">${text}</span>`, text, spread.feedbackDropAudio, spread.hideDropSpeechBtn);
              feedbackTimeout = setTimeout(() => {
                feedback.classList.add('hidden');
              }, 2000);
            }
          }

        } else {
          currentX = 0;
          currentY = 0;
          item.style.transform = `translate(0px, 0px) scale(1)`;

          if (typeof sounds !== 'undefined' && sounds.playWrong) sounds.playWrong();

          if (feedback) {
            if (feedbackTimeout) clearTimeout(feedbackTimeout);
            const text = feedback.dataset.incorrectText;
            window.showGameFeedback(feedback, `<span style="color:#C0392B">${text}</span>`, text, feedback.dataset.incorrectAudio, spread.hideIncorrectSpeechBtn);
            feedbackTimeout = setTimeout(() => {
              feedback.classList.add('hidden');
            }, 3000);
          }
        }
      } else {
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
