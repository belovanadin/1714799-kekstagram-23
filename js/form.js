import {image, effects} from './effect.js';
import {isEscPressed} from './utils.js';

const MAX_SYMBOL = 20;
const MAX_HASHTAGS = 5;

const Zoom = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};
const body = document.querySelector('body');
const fileUpload = body.querySelector('#upload-file');
const overlay = body.querySelector('.img-upload__overlay');
const formUpload = document.querySelector('.img-upload__form');
const formCloseUpload = document.querySelector('.img-upload__cancel');
const scaleControlValue = body.querySelector('.scale__control--value');
const controlSmaller = body.querySelector('.scale__control--smaller');
const controlBigger = body.querySelector('.scale__control--bigger');

const imagePreview = body.querySelector('.img-upload__preview');

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imagePreview.style.transform = '';
  imagePreview.className = 'img-upload__preview';
  imagePreview.style.filter = 'none';
  formUpload.reset();
};

const onCloseFormEscKeyDown = (evt) => {
  if (isEscPressed(evt)) {
    closeForm();
    document.removeEventListener('keydown', onCloseFormEscKeyDown);
    evt.preventDefault();
    closeForm();
  }
};

fileUpload.addEventListener('change', (evt) => {
  evt.preventDefault();
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  image.style.filter = effects.none();
  document.addEventListener('keydown', onCloseFormEscKeyDown);
});


formCloseUpload.addEventListener('click', () => {
  closeForm();
});


controlSmaller.addEventListener('click', () => {
  let size = parseInt(scaleControlValue.value, 10);

  if (size === Zoom.MIN) {
    return;
  }
  size -= Zoom.STEP;
  scaleControlValue.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
});

controlBigger.addEventListener('click', () => {
  let size = parseInt(scaleControlValue.value, 10);

  if (size === Zoom.MAX) {
    return;
  }
  size += Zoom.STEP;
  scaleControlValue.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
});


const inputHashtag = document.querySelector('.text__hashtags');
inputHashtag.addEventListener('input', () => {

  const invalidMessage = [];
  inputHashtag.setCustomValidity('');
  const inputText = inputHashtag.value.toLowerCase().trim();
  if (!inputText) {
    return;
  }
  const inputArray = inputText.split(/\s+/);
  if (inputArray.length === 0) {
    return;
  }

  const isStartNotHashtag = inputArray.some((item) => item[0] !== '#');

  if (isStartNotHashtag) {
    invalidMessage.push('Хеш-тег должен начинатся с символа #');
  }

  const isOnlyLatticeHashtag = inputArray.some((item) => item === '#');
  if (isOnlyLatticeHashtag) {
    invalidMessage.push('хеш-тег не может состоять только из одной решетки');
  }

  const isSplitSpaceHashtag = inputArray.some((item) => item.indexOf('#', 1) >= 1);
  if (isSplitSpaceHashtag) {
    invalidMessage.push('Хеш-теги разделяются пробелами');
  }
  const itemSet = new Set (inputArray);
  const isRepeatHashtag = inputArray.some((item) => item.length !== itemSet.size);
  if (isRepeatHashtag) {
    invalidMessage.push('Один и тот же хеш-тег не может быть использован дважды');
  }

  const isLongHashtag = inputArray.some((item) => item.length > MAX_SYMBOL);
  if (isLongHashtag) {
    invalidMessage.push('Максимальная длина одного хеш-тега 20 символов, включая решётку');
  }

  if (inputArray.length > MAX_HASHTAGS) {
    invalidMessage.push('Нельзя болььше 5 хеш-тегов');
  }

  if (invalidMessage.length > 0) {
    inputHashtag.setCustomValidity(invalidMessage.join('.\n'));
    inputHashtag.style.border = '2px solid red';
  } else {
    inputHashtag.style.border = 'none';
  }
});

export {closeForm};
