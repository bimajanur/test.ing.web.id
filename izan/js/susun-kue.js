window.initSusunKue = function (container, spread = {}) {
  const draggables = container.querySelectorAll(".draggable-item");
  const dropZones = container.querySelectorAll(".drop-zone-container");
  const feedback = container.querySelector(".drag-feedback");

  if (!draggables.length || !dropZones.length) return;

  if (feedback && spread.startInstruction) {
    const text = spread.startInstruction;
    window.showGameFeedback(
      feedback,
      `<span style="color:var(--color-wood-dark)">${text}</span>`,
      text,
      spread.startAudio,
      spread.hideStartSpeechBtn,
    );
  }

  let feedbackTimeout = null;
  let completedZones = 0;
  // Calculate total zones dynamically (excluding dummy zones)
  const totalZones = Array.from(dropZones).filter(
    (dz) => dz.dataset.target !== "dummy",
  ).length;

  draggables.forEach((item) => {
    let isDragging = false;
    let startX, startY;
    let currentX = 0;
    let currentY = 0;
    let hasSuccessfullyDropped = false;

    const handleStart = (e) => {
      if (hasSuccessfullyDropped && item.dataset.target === "") return;
      isDragging = true;
      const clientX = e.type.includes("mouse")
        ? e.clientX
        : e.touches[0].clientX;
      const clientY = e.type.includes("mouse")
        ? e.clientY
        : e.touches[0].clientY;
      const scale =
        Math.min(window.innerWidth / 1280, window.innerHeight / 720) || 1;

      startX = clientX - currentX * scale;
      startY = clientY - currentY * scale;

      item.style.zIndex = 1000;
      item.style.transition = "none";
      item.style.willChange = "transform";
      item.style.pointerEvents = "none";
      item.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.1) rotate(35deg)`;
      item.style.cursor = "grabbing";
    };

    const handleMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const clientX = e.type.includes("mouse")
        ? e.clientX
        : e.touches[0].clientX;
      const clientY = e.type.includes("mouse")
        ? e.clientY
        : e.touches[0].clientY;
      const scale =
        Math.min(window.innerWidth / 1280, window.innerHeight / 720) || 1;

      currentX = (clientX - startX) / scale;
      currentY = (clientY - startY) / scale;

      item.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.1) rotate(35deg)`;
    };

    const handleEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;

      item.style.transition = "transform 0.3s ease";
      item.style.willChange = "auto";
      item.style.pointerEvents = "auto";
      item.style.zIndex = 10;
      item.style.cursor = "grab";

      const itemRect = item.getBoundingClientRect();
      // Define collision area as the full item for easier dropping
      const itemColLeft = itemRect.left;
      const itemColRight = itemRect.right;
      const itemColTop = itemRect.top;
      const itemColBottom = itemRect.bottom;

      let collidedZone = null;
      let matchingCollidedZone = null;

      for (const dropZone of dropZones) {
        // Skip dummy zones completely
        if (dropZone.dataset.target === "dummy") continue;

        const dropRect = dropZone.getBoundingClientRect();
        const isColliding = !(
          itemColRight < dropRect.left - 20 ||
          itemColLeft > dropRect.right + 20 ||
          itemColBottom < dropRect.top - 20 ||
          itemColTop > dropRect.bottom + 20
        );

        if (isColliding) {
          if (!collidedZone && !dropZone.dataset.completed)
            collidedZone = dropZone; // keep the first uncompleted one as fallback

          if (
            !dropZone.dataset.completed &&
            ((item.dataset.target &&
              item.dataset.target === dropZone.dataset.target) ||
              (!item.dataset.target && item.dataset.correct === "true"))
          ) {
            matchingCollidedZone = dropZone;
            break;
          }
        }
      }

      collidedZone = matchingCollidedZone || collidedZone;

      if (collidedZone) {
        const isCorrectTarget =
          item.dataset.target &&
          item.dataset.target === collidedZone.dataset.target;
        const isLegacyCorrect =
          !item.dataset.target && item.dataset.correct === "true";

        if (isCorrectTarget || isLegacyCorrect) {
          // Success
          currentX = 0;
          currentY = 0;
          item.style.transform = `translate(0px, 0px) scale(1)`;

          hasSuccessfullyDropped = true;

          const dropZoneImg =
            collidedZone.querySelector(".drop-zone-img") ||
            collidedZone.querySelector("#drop-zone-img");
          if (dropZoneImg && !collidedZone.dataset.completed) {
            if (collidedZone.dataset.dynamicSrc === "true") {
              dropZoneImg.src = item.src;
            } else {
              dropZoneImg.src = dropZoneImg.dataset.doneSrc;
            }
            collidedZone.dataset.completed = "true";
            completedZones++;

            if (item.dataset.hideOnDrop === "true") {
              item.style.opacity = "0";
              item.style.pointerEvents = "none";
            }
          }

          if (typeof sounds !== "undefined" && sounds.playChime)
            sounds.playChime();

          if (feedback) {
            if (feedbackTimeout) clearTimeout(feedbackTimeout);
            const text = feedback.dataset.correctText || "Bagus!";
            window.showGameFeedback(
              feedback,
              `<span style="color:var(--color-grass-dark)">${text}</span>`,
              text,
              feedback.dataset.correctAudio,
              spread.hideCorrectSpeechBtn,
            );
            feedbackTimeout = setTimeout(() => {
              feedback.classList.add("hidden");
            }, 2000);
          }

          if (completedZones >= totalZones) {
            const nextBtn = feedback
              ?.closest(".game-popup-content")
              ?.querySelector(".next-level-btn");
            if (nextBtn) nextBtn.classList.remove("hidden");

            if (window.triggerGameWinCelebration) {
              window.triggerGameWinCelebration(
                feedback,
                "Semua sudah sesuai! Hebat!",
                spread.hideCorrectSpeechBtn,
              );
            } else if (feedback) {
              const text = "Semua warna sudah sesuai! Hebat!";
              window.showGameFeedback(
                feedback,
                `<span style="color:var(--color-grass-dark)">${text}</span>`,
                text,
                feedback.dataset.correctAudio,
                spread.hideCorrectSpeechBtn,
              );
            }
          }
        } else {
          // Incorrect
          currentX = 0;
          currentY = 0;
          item.style.transform = `translate(0px, 0px) scale(1)`;

          if (typeof sounds !== "undefined" && sounds.playWrong)
            sounds.playWrong();

          if (feedback) {
            if (feedbackTimeout) clearTimeout(feedbackTimeout);
            const text = feedback.dataset.incorrectText || "Coba lagi!";
            window.showGameFeedback(
              feedback,
              `<span style="color:#C0392B">${text}</span>`,
              text,
              feedback.dataset.incorrectAudio,
              spread.hideIncorrectSpeechBtn,
            );
            feedbackTimeout = setTimeout(() => {
              feedback.classList.add("hidden");
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

    item.addEventListener("mousedown", handleStart);
    document.addEventListener("mousemove", handleMove, { passive: false });
    document.addEventListener("mouseup", handleEnd);

    item.addEventListener("touchstart", handleStart, { passive: false });
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("touchend", handleEnd);
  });
};
