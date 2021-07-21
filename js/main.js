import './form.js';
import { renderPhotos } from './pictures.js';
import './effect.js';
import './show-message.js';
import { request } from './fetch.js';
import './filters.js';

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderPhotos(data);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};
const onError = () => {
  const messageAlert = document.createElement('div');
  const body = document.querySelector('body');
  messageAlert.style.fontSize = '30px';
  messageAlert.style.backgroundColor = 'red';
  messageAlert.textContent = 'Ошибка загрузки';
  body.appendChild(messageAlert);
};

request(onSuccess, onError, 'GET');

export {photos};
