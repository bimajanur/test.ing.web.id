/**
 * INTERACTIVE CHILDREN'S BOOK - STATE
 */
const state = {
  currentSpreadIndex: 0,
  totalSpreads: bookData.spreads.length,
  isTransitioning: false,

  getCurrentSpread() {
    return bookData.spreads[this.currentSpreadIndex];
  },

  getSpreadAt(index) {
    return bookData.spreads[index];
  }
};
