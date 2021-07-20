import { debounse } from './utils/utils.js';
import { renderPhotos } from './pictures.js';

const FILTER_RANDOM_COUNT = 10;
const filters = document.querySelector('.img-filters');
const filtersForm = filters.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelector('.button');

const filters = {
  'filter-default': setFilterDefault,
  'filter-random': setFilterRandom,
  'filter-discussed': setFilterDiscussed,
};

const setFilter = (data, cb) => {
  filtersForm.addEventListener('click', (evt) => {
    if(evt.targetid === 'filter-default')
  });
};

