import {onBigPictureEscKeyDown} from './pictures.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const pictureCloseElement = document.querySelector('.big-picture__cancel');
const pictureCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');

const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loadComments = bigPicture.querySelector('.comments-loader');
const COMMENTS_LOAD_STEP = 5;

const addComments = (comments) => {
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
  socialComments.appendChild(commentFragment);
  let currentComments = socialComments.querySelectorAll('.social__comment');
  if (currentComments.length >= comments.length) {
    loadComments.classList.add('hidden');
  }
  else {
    loadComments.classList.remove('hidden');
  }

  const onloadCommentsButtonClick = function () {
    const sliceBegin = currentComments.length;
    const sliceEnd = currentComments.length + COMMENTS_LOAD_STEP;
    const slicedComments = comments.slice(sliceBegin, sliceEnd);
    comments(slicedComments);

    currentComments = socialComments.querySelectorAll('.social__comment');
    socialCommentsCount.textContent = `${currentComments.length} из ${comments.length} комментариев`;
    if (currentComments.length >= comments.length) {
      loadComments.classList.add('hidden');
    }
    else {
      loadComments.classList.remove('hidden');
    }
  };
  loadComments.addEventListener('click', onloadCommentsButtonClick);
  loadComments.dispatchEvent(new Event('click'));
  bigPicture.addEventListener('close', () => {
    loadComments.removeEventListener('click', onloadCommentsButtonClick);
  });
};

/* Отображение не более 5 комментариев
const countingСomments = (count, countView) => {
  if (count <= countView) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};
}*/

/*const onCommentsLoaderClick =  () => {
};
commentsLoader.addEventListener('click', onCommentsLoaderClick);
*/

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const handleClose = () => {
  closeBigPicture();
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
};

const onCloseBigPictureClick = () => {
  handleClose();
};


const showBigPicture = (picture, comments, likes) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImg.src = picture.url;
  likesCount.textContent = likes;
  commentsCount.textContent = picture.comments;
  pictureCaption.textContent = picture.description;
  socialComments.innerHTML = '';

  addComments(comments);
};


pictureCloseElement.addEventListener('click', onCloseBigPictureClick);

export {showBigPicture, closeBigPicture,handleClose};
