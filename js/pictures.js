import { showBigPicture, handleClose} from './big-picture.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const onBigPictureEscKeyDown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    handleClose();
  }
};


const renderPhoto = ({url, comments, likes}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(pictures, comments, likes);
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

export {renderPhotos, onBigPictureEscKeyDown};
