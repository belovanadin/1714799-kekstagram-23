import { request } from './fetch.js';
import {closeForm} from './form.js';

const body = document.querySelector('body');
const formUpload = document.querySelector('.img-upload__form');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const closePopupMessage = () => {
  const popupMessage = document.body.querySelector('.error') || document.body.querySelector('.success');
  popupMessage.remove();
};

const onMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closePopupMessage();
  }
};

const onDocumentClick = () => {
  closePopupMessage();
  document.removeEventListener('keydown', onMessageEscKeydown);
};

const showSuccessMessage = () => {
  const messageElement = successMessage.cloneNode(true);
  messageElement.addEventListener('click', onDocumentClick);
  body.appendChild(messageElement);
  document.addEventListener('keydown', onMessageEscKeydown, {once: true});
};
const showErrorMessage = () => {
  const messageElement = errorMessage.cloneNode(true);
  messageElement.addEventListener('click', onDocumentClick);
  body.appendChild(messageElement);
  document.addEventListener('keydown', onMessageEscKeydown, {once: true});
};

formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(formUpload);
  const onSuccess = () => {
    closeForm();
    showSuccessMessage();
  };
  const onError = () => {
    showErrorMessage();
  };
  request(onSuccess, onError, 'POST', formData);
});
