import { showBigPicture, handleClose} from './big-picture.js';
import {isEscPressed} from './utils.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const onBigPictureEscKeyDown = (evt) => {
  if (isEscPressed(evt)) {
    handleClose();
  }
};

const removePhotos = () => {
  const photos = pictures.querySelectorAll('.picture');
  if (photos) {
    photos.forEach((photo) => photo.remove());
  }
};

const renderPhoto = ({url, comments, likes, description}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(url, comments, likes, description);
    document.addEventListener('keydown', onBigPictureEscKeyDown);
  });
  return pictureElement;
};

const fragment = document.createDocumentFragment();
const renderPhotos = (photos) => {
  photos.forEach((item) => {
    fragment.appendChild(renderPhoto(item));
  });
  pictures.appendChild(fragment);
};

export {renderPhotos, onBigPictureEscKeyDown, removePhotos};
