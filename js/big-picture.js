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

let currentComents = COMMENTS_LOAD_STEP;
let onloadCommentsButtonClick;
const addComments = (comments) => {
  socialComments.innerHTML = '';
  onloadCommentsButtonClick = () => {
    currentComents += COMMENTS_LOAD_STEP;
    addComments(comments);
  };
  currentComents = (currentComents > comments.length) ? comments.length : currentComents;

  const comentsSelected = comments.slice(0, currentComents);

  if (comments.length <= COMMENTS_LOAD_STEP || currentComents >= comments.length) {
    loadComments.classList.add('hidden');
  } else {
    loadComments.classList.remove('hidden');
  }

  socialCommentsCount.textContent = `${currentComents} из ${comments.length} комментариев`;

  const commentFragment = document.createDocumentFragment();

  comentsSelected.forEach((comment) => {
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

  loadComments.addEventListener('click', onloadCommentsButtonClick);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  currentComents = COMMENTS_LOAD_STEP;
};

const handleClose = () => {
  closeBigPicture();
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
};

const onCloseBigPictureClick = () => {
  handleClose();
  loadComments.removeEventListener('click', onloadCommentsButtonClick);
};


const showBigPicture = (url, comments, likes, description) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;
  addComments(comments);
};


pictureCloseElement.addEventListener('click', onCloseBigPictureClick);

export {showBigPicture, closeBigPicture,handleClose};
