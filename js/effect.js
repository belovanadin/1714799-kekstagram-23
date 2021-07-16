
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderUpload = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');

const imagePreview = document.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');


let currentEffect = '';

const EFFECTS = {
  chrome: {
    name: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  sepia: {
    name: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  marvin: {
    name: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
  },
  phobos: {
    name: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
  },
  heat: {
    name: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 1,
    start: 3,
  },
};

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  effectLevelValue.value = unencoded[handle];
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});


effectsList.addEventListener('click', (evt) => {
  let target = evt.target;

  if (target.classList.contains('effects__label')) {
    target = evt.target.querySelector('span');
  }

  if (target.classList.contains('effects__preview')) {
    if (currentEffect !== '') {
      image.classList.remove(currentEffect);
    }

    currentEffect = target.classList[1];
    image.classList.add(currentEffect);
  }
});
