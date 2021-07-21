const DELAY = 500;
const checkStringLength = (string, length) => string.length <= length;

const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, DELAY);
  };
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const isEscPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {checkStringLength, debounce, shuffleArray, isEscPressed};
