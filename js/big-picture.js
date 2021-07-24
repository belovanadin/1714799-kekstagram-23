import {onBigPictureEscKeyDown} from './pictures.js';

const COMMENTS_LOAD_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const pictureCloseElement = document.querySelector('.big-picture__cancel');
const pictureCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');

const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loadComments = bigPicture.querySelector('.comments-loader');

let commentsCount = COMMENTS_LOAD_STEP;
let currentComments = [];

const addComments = () => {
  socialComments.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  const commentsSelected = currentComments.slice(0, commentsCount);

  if (currentComments.length <= COMMENTS_LOAD_STEP || commentsCount >= currentComments.length) {
    loadComments.classList.add('hidden');
  } else {
    loadComments.classList.remove('hidden');
  }

  socialCommentsCount.textContent = `${commentsCount} из ${currentComments.length} комментариев`;

  const commentFragment = document.createDocumentFragment();

  commentsSelected.forEach((comment) => {
    const newComment = document.createElement('li');
    const imgComment = document.createElement('img');
    const textComment = document.createElement('p');
    newComment.classList.add('social__comment');
    imgComment.classList.add('social--picture');
    textComment.classList.add('social__text');
    imgComment.src = comment.avatar;
    imgComment.alt = comment.name;
    textComment.textContent = comment.message;
    newComment.appendChild(imgComment);
    newComment.appendChild(textComment);

    commentFragment.appendChild(newComment);
  });

  socialComments.appendChild(commentFragment);
};

const onloadCommentsButtonClick = () => {
  commentsCount += COMMENTS_LOAD_STEP;
  addComments();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsCount = COMMENTS_LOAD_STEP;
  currentComments = [];
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
  loadComments.removeEventListener('click', onloadCommentsButtonClick);
};

const onCloseBigPictureClick = () => {
  closeBigPicture();
  pictureCloseElement.removeEventListener('click', onCloseBigPictureClick);
};


const showBigPicture = (url, comments, likes, description) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;

  currentComments = comments;
  addComments();

  loadComments.addEventListener('click', onloadCommentsButtonClick);
  pictureCloseElement.addEventListener('click', onCloseBigPictureClick);
};

export {showBigPicture, closeBigPicture};
