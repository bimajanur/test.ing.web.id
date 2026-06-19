// Evaluasi Kuis Interaktif
window.handleQuizAnswer = function (isCorrect, buttonElement, pageIndex) {
  const container = buttonElement.closest('.quiz-options-page');
  const feedbackBox = container.querySelector(`#quiz-feedback-${pageIndex}`);
  const feedbackText = feedbackBox.querySelector('.quiz-feedback-text');
  const allButtons = container.querySelectorAll('.quiz-option-btn');

  // Get spread index
  const spreadIndex = pageIndex - 1;
  const spread = state.getSpreadAt(spreadIndex);
  const quizData = spread.right;

  // Reset bubble classes
  feedbackBox.className = 'quiz-feedback-bubble';

  if (isCorrect) {
    sounds.playChime();

    buttonElement.classList.add('quiz-correct');
    allButtons.forEach(btn => btn.disabled = true);

    feedbackText.innerHTML = `🌟 <strong>Hebat!</strong> ${quizData.feedbackCorrect}`;
    feedbackBox.classList.add('correct-feedback');
    feedbackBox.classList.remove('hidden');
  } else {
    sounds.playWrong();

    buttonElement.classList.add('quiz-incorrect');
    buttonElement.classList.add('shake-element');
    setTimeout(() => buttonElement.classList.remove('shake-element'), 500);

    feedbackText.innerHTML = `🧐 ${quizData.feedbackIncorrect}`;
    feedbackBox.classList.add('incorrect-feedback');
    feedbackBox.classList.remove('hidden');
  }
};
