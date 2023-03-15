import {pictures} from './thumbnail-rendering.js';
import {similarPictures} from './main.js';
import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const socialComments = document.querySelector('.social__comments');
const socialCommentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

const renderComments = (comments) => {
  const similarCommentFragment = document.createDocumentFragment();
  const socialComment = document.querySelector('.social__comment').cloneNode(true);
  socialComments.innerHTML = '';

  comments.forEach(({avatar, name, message}) => {
    const socialCommentCopy = socialComment.cloneNode(true);

    socialCommentCopy.querySelector('.social__picture').src = avatar;
    socialCommentCopy.querySelector('.social__picture').alt = name;
    socialCommentCopy.querySelector('.social__text').textContent = message;

    similarCommentFragment.append(socialCommentCopy);
  });
  socialComments.append(similarCommentFragment);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const openBigPicture = (evt) => {
  if (evt.target.closest('.picture')) {
    bigPicture.classList.remove('hidden');
  }
  const pictureId = Number(evt.target.closest('.picture').querySelector('.picture__img').dataset.id);
  const pictureItem = similarPictures.find((item) => item.id === pictureId);
  const commentItems = pictureItem.comments;

  bigPictureImg.querySelector('img').src = evt.target.closest('.picture').querySelector('.picture__img').src;

  bigPicture.querySelector('.likes-count').textContent = evt.target.closest('.picture').querySelector('.picture__likes').textContent;
  bigPicture.querySelector('.social__caption').textContent = pictureItem.description;
  bigPicture.querySelector('.comments-count').textContent = evt.target.closest('.picture').querySelector('.picture__comments').textContent;

  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  renderComments(commentItems); //добавляет комменты в разметку
};

pictures.addEventListener('click', openBigPicture); //открывает фотку

const closeBigPicture = (evt) => {
  if(evt.target.closest('.big-picture__cancel')) {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
  document.removeEventListener('keydown', onDocumentKeydown);
};

bigPicture.addEventListener('click', closeBigPicture); //закрывает фотку
