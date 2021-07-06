import { showBigPicture, closeBigPicture } from './big-picture';
import { photos } from './data';
const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const onBigPictureEscKeyDown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closeBigPicture();
    document.removeEventListener('keydown', onBigPictureEscKeyDown);
  }
};

const renderPhoto = (picture, comments, likes) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(picture, comments, likes);
    document.addEventListener('keydown', onBigPictureEscKeyDown);
  });
  return pictureElement;
};

const fragment = document.createDocumentFragment();
const renderPhotos = () => {
  photos.forEach((item) => {
    fragment.appendChild(renderPhoto(item));
  });
  pictures.appendChild(fragment);
};
renderPhotos();
export {renderPhotos, onBigPictureEscKeyDown};

