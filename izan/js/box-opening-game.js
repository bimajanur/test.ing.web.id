window.initBoxOpeningGame = function (container, spread = {}) {
  const track = container.querySelector("#box-slider-track");
  const tapeContainer = container.querySelector("#box-tape-container");
  const flapTop = container.querySelector("#box-flap-top");
  const flapBottom = container.querySelector("#box-flap-bottom");
  const boxBgOpened = container.querySelector("#box-bg-opened");
  const feedback = container.querySelector(".drag-feedback");
  const nextBtn = container.querySelector(".next-level-btn");
  const boxItems = container.querySelectorAll(".box-item");
  const boxContainer = container.querySelector(".box-container");
  const nampah = container.querySelector("#nampah-container");
  const zoomOverlay = container.querySelector("#zoom-overlay");
  const zoomImage = container.querySelector("#zoom-image");

  if (!tapeContainer || !track) return;

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

  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let maxX = track.offsetWidth * 0.8; // require 80% drag
  let isOpened = false;

  const arrow = container.querySelector("#box-slider-arrow");
  if (arrow) {
    arrow.classList.add("hint-animation");
  }

  const handleStart = (e) => {
    if (isOpened) return;
    isDragging = true;

    if (arrow) arrow.classList.remove("hint-animation");
    const clientX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    const scale =
      Math.min(window.innerWidth / 1280, window.innerHeight / 720) || 1;
    startX = clientX - currentX * scale;

    track.style.transition = "none";
    maxX = track.offsetWidth * 0.8; // require 80% drag
  };

  const handleMove = (e) => {
    if (!isDragging || isOpened) return;
    e.preventDefault();

    const clientX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    const scale =
      Math.min(window.innerWidth / 1280, window.innerHeight / 720) || 1;
    currentX = (clientX - startX) / scale;

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
      track.style.transition = "transform 0.3s ease";
      currentX = 0;
      track.style.transform = `translateX(0px)`;
    }
  };

  const openBox = () => {
    isOpened = true;
    isDragging = false;

    if (feedback) feedback.classList.add("hidden");

    // Play sound if available
    if (typeof sounds !== "undefined" && sounds.playChime) sounds.playChime();

    // Hide tape and arrow container
    tapeContainer.style.opacity = "0";
    setTimeout(() => {
      tapeContainer.style.display = "none";
    }, 300);

    // Animate flaps
    flapTop.classList.add("flap-open-top");
    flapBottom.classList.add("flap-open-bottom");

    // Show inner box
    boxBgOpened.classList.remove("hidden");
    boxBgOpened.style.opacity = "0";
    boxBgOpened.style.transition = "opacity 0.8s ease";

    // Show box items
    boxItems.forEach((item) => {
      item.classList.remove("hidden");
      item.style.opacity = "0";
    });

    setTimeout(() => {
      boxBgOpened.style.opacity = "1";
      boxItems.forEach((item) => {
        item.style.opacity = "1";
      });

      // Slide box to the left and slide nampah in
      setTimeout(() => {
        if (boxContainer) {
          boxContainer.classList.add("box-move-left");
          if (spread.mainBox && spread.mainBox.movedBoxTransform) {
            boxContainer.style.setProperty(
              "transform",
              spread.mainBox.movedBoxTransform,
              "important",
            );
          }
        }
        if (nampah) {
          nampah.classList.add("nampah-moved");
          if (spread.nampah && spread.nampah.movedNampahTransform) {
            nampah.style.setProperty(
              "transform",
              spread.nampah.movedNampahTransform,
              "important",
            );
          }
        }

        // Initialize Phase 2 after animations
        setTimeout(() => {
          initDragItems();
        }, 1600);
      }, 600);
    }, 200);
  };

  const initDragItems = () => {
    if (feedback) {
      const text =
        feedback.dataset.dragInstruction || "Keluarkan oleh-oleh ke nampah";
      window.showGameFeedback(
        feedback,
        `<span style="color:var(--color-wood-dark)">${text}</span>`,
        text,
        spread.dragAudio,
        spread.hideDragSpeechBtn,
      );
    }

    let droppedCount = 0;
    const totalItems = boxItems.length;

    boxItems.forEach((item, index) => {
      item.classList.add("draggable");
      let isItemDragging = false;
      let startX = 0,
        startY = 0;
      let currentX = 0,
        currentY = 0;
      let isDropped = false;

      const onStart = (e) => {
        if (isDropped || e.target !== item) return;
        isItemDragging = true;

        item.style.zIndex = 1000 + index;

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

        item.style.transition = "none";
        item.style.willChange = "transform";
        item.style.pointerEvents = "none";
        item.style.cursor = "grabbing";
        item.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.1) rotate(10deg)`;
      };

      const onMove = (e) => {
        if (!isItemDragging) return;
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

        item.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.1) rotate(10deg)`;
      };

      const onEnd = (e) => {
        if (!isItemDragging) return;
        isItemDragging = false;
        item.style.transition = "transform 0.3s ease";
        item.style.willChange = "auto";
        item.style.pointerEvents = "auto";
        item.style.cursor = "grab";

        if (!nampah) return;
        const itemRect = item.getBoundingClientRect();
        const nampahRect = nampah.getBoundingClientRect();
        const itemScale = spread.itemScale !== undefined ? spread.itemScale : 1;

        const itemCenter = {
          x: itemRect.left + itemRect.width / 2,
          y: itemRect.top + itemRect.height / 2,
        };
        const nampahCenter = {
          x: nampahRect.left + nampahRect.width / 2,
          y: nampahRect.top + nampahRect.height / 2,
        };

        const dx = itemCenter.x - nampahCenter.x;
        const dy = itemCenter.y - nampahCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxRadius = nampahRect.width / 2.5;

        if (distance <= maxRadius) {
          isDropped = true;
          droppedCount++;

          if (typeof sounds !== "undefined" && sounds.playPop) sounds.playPop();

          item.style.zIndex = 10 + droppedCount;

          // Snap to a natural non-overlapping position
          const scale =
            Math.min(window.innerWidth / 1280, window.innerHeight / 720) || 1;
          const angle = index * (360 / totalItems) * (Math.PI / 180);
          const arrangeRadius = nampahRect.width * 0.26;

          const targetX = nampahCenter.x + Math.cos(angle) * arrangeRadius;
          const targetY = nampahCenter.y + Math.sin(angle) * arrangeRadius;

          currentX +=
            (targetX - itemCenter.x) / scale -
            (itemRect.width * (itemScale - 1)) / 2 / scale;
          currentY +=
            (targetY - itemCenter.y) / scale -
            (itemRect.height * (itemScale - 1)) / 2 / scale;
          item.style.transform = `translate(${currentX}px, ${currentY}px)`;
          item.style.width = `${(itemRect.width / scale) * itemScale}px`;
          item.classList.remove("draggable");
          item.style.pointerEvents = "auto";
          item.style.cursor = "pointer";

          item.addEventListener("click", () => {
            const fullImage = item.dataset.fullImage;
            if (fullImage) {
              zoomImage.src = fullImage;
              zoomOverlay.classList.remove("hidden");
              if (typeof sounds !== "undefined" && sounds.playPop)
                sounds.playPop();
            }
          });

          if (droppedCount === totalItems) {
            if (nextBtn) {
              nextBtn.classList.remove("hidden");
            }
            if (window.triggerGameWinCelebration) {
              window.triggerGameWinCelebration(
                feedback,
                feedback.dataset.correctText,
                spread.hideCorrectSpeechBtn,
              );
            } else {
              if (feedback) {
                const text = feedback.dataset.correctText;
                window.showGameFeedback(
                  feedback,
                  `<span style="color:var(--color-grass-dark)">${text}</span>`,
                  text,
                  feedback.dataset.correctAudio,
                  spread.hideCorrectSpeechBtn,
                );
              }
              if (typeof sounds !== "undefined" && sounds.playSuccess)
                sounds.playSuccess();
            }
          }
        } else {
          currentX = 0;
          currentY = 0;
          item.style.transform = `translate(0px, 0px)`;
        }
      };

      item.addEventListener("mousedown", onStart);
      item.addEventListener("touchstart", onStart, { passive: false });

      document.addEventListener("mousemove", onMove, { passive: false });
      document.addEventListener("touchmove", onMove, { passive: false });

      document.addEventListener("mouseup", onEnd);
      document.addEventListener("touchend", onEnd);
    });
  };

  tapeContainer.addEventListener("mousedown", handleStart);
  tapeContainer.addEventListener("touchstart", handleStart, { passive: false });
  document.addEventListener("mousemove", handleMove, { passive: false });
  document.addEventListener("touchmove", handleMove, { passive: false });
  document.addEventListener("mouseup", handleEnd);
  document.addEventListener("touchend", handleEnd);
};
