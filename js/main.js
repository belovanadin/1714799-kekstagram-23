import './form.js';
import { renderPhotos } from './pictures.js';
import './effect.js';
import { request } from './fetch.js';

const onSuccess = (data) => {
  renderPhotos(data);
};
const onError = () => {

};
request(onSuccess, onError, 'GET');
