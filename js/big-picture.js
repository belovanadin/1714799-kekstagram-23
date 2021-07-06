import {onBigPictureEscKeyDown} from './picture.js';
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const pictureCloseElement = document.querySelector('.big-picture__cancel');
const pictureCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};
const onCloseBigPictureClick = () => {
  onBigPictureEscKeyDown();
};


const showBigPicture = (picture, comments, likes) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPictureImg.src = picture.url;
  likesCount.textContent = likes;
  commentsCount.textContent = picture.comments;
  pictureCaption.textContent = picture.description;
  bigPictureComments.innerHTML = '';

  const commentFragment = document.createDocumentFragment();

  comments.forEach((comment, index, avatar, name, message) => {
    const newComment = document.createElement('li');
    const imgComment = document.createElement('img');
    const textComment = document.createElement('p');
    newComment.classList.add('social__comment');
    imgComment.classList.add('social--picture');
    textComment.classList.add('social__text');
    imgComment.src = avatar;
    imgComment.alt = name;
    textComment.textContent = message;
    newComment.appendChild(imgComment);
    newComment.appendChild(textComment);

    commentFragment.appendChild(newComment);
  });
  bigPictureComments.appendChild(commentFragment);
};


pictureCloseElement.addEventListener('click', onCloseBigPictureClick);

export {showBigPicture, closeBigPicture};
