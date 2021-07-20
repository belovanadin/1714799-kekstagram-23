import { debounce, shuffleArray } from './utils.js';
import { renderPhotos, removePhotos } from './pictures.js';
import { photos } from './main.js';

const FILTER_RANDOM_COUNT = 10;
const filters = document.querySelector('.img-filters');
const filtersForm = filters.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelectorAll('button');


const filterRules = {
  'filter-default': () => photos.slice(),
  'filter-random': () => shuffleArray(photos).slice(0, FILTER_RANDOM_COUNT),
  'filter-discussed': () => {
    const discussedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
    return discussedPhotos;
  },
};

const onButtonClick = debounce((evt) => {
  const selected = filtersForm.querySelector('.img-filters__button--active');
  if (selected) {
    selected.classList.remove('img-filters__button--active');
  }

  evt.target.classList.add('img-filters__button--active');
  removePhotos();
  renderPhotos(filterRules[evt.target.id]());
});

filterButtons.forEach((button) => {
  button.addEventListener('click', onButtonClick);
});
