import {isEscapeKey} from './util.js';

const COMMENTS_PER_STEP = 5;

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const socialComments = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const commentVisible = document.querySelector('.social__comment-visible');
const commentsCount = document.querySelector('.social__comment-count');

//функция для выведения на экран пяти комментариев
const showComments = () => {
  const commentsMassive = socialComments.querySelectorAll('.hidden');
  const nextCommentsCount = commentsMassive.length < COMMENTS_PER_STEP ? commentsMassive.length : COMMENTS_PER_STEP;
  for (let i = 0; i < nextCommentsCount; i++) {
    commentsMassive[i].classList.remove('hidden');
  }
  if (commentsMassive.length <= COMMENTS_PER_STEP) {
    commentsLoader.classList.add('hidden');
  }
  commentVisible.textContent = commentsCount.querySelector('.comments-count').textContent - socialComments.querySelectorAll('.hidden').length;
};

const renderComments = (comments) => {
  const similarCommentFragment = document.createDocumentFragment();
  const socialComment = document.querySelector('.social__comment').cloneNode(true);
  socialComments.innerHTML = '';

  comments.forEach(({avatar, name, message}) => {
    const socialCommentCopy = socialComment.cloneNode(true);

    socialCommentCopy.querySelector('.social__picture').src = avatar;
    socialCommentCopy.querySelector('.social__picture').alt = name;
    socialCommentCopy.querySelector('.social__text').textContent = message;
    socialCommentCopy.classList.add('hidden');
    similarCommentFragment.append(socialCommentCopy);
  });
  socialComments.append(similarCommentFragment);
  showComments();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsLoader.classList.remove('hidden');
  }
};

const openBigPicture = (evt, pictures) => {
  if(!evt.target.closest('.picture')){
    return;
  }
  if (evt.target.closest('.picture')) {
    bigPicture.classList.remove('hidden');
  }
  const pictureId = Number(evt.target.closest('.picture').querySelector('.picture__img').dataset.id);
  const pictureItem = pictures.find((item) => item.id === pictureId);
  const commentItems = pictureItem.comments;

  bigPictureImg.querySelector('img').src = evt.target.closest('.picture').querySelector('.picture__img').src;

  bigPicture.querySelector('.likes-count').textContent = evt.target.closest('.picture').querySelector('.picture__likes').textContent;
  bigPicture.querySelector('.social__caption').textContent = pictureItem.description;
  bigPicture.querySelector('.comments-count').textContent = evt.target.closest('.picture').querySelector('.picture__comments').textContent;

  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  renderComments(commentItems); //добавляет комменты в разметку
};

const closeBigPicture = (evt) => {
  if(evt.target.closest('.big-picture__cancel')) {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsLoader.classList.remove('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const picturesContainerClick = (evt, pictures) => {
  openBigPicture(evt, pictures);
};

const onBigPictureClick = (evt) => {
  closeBigPicture(evt);
};

const onCommentsLoaderClick = () => {
  showComments();
};

const setListenersOnBigPicture = (pictures) => {
  picturesContainer.addEventListener('click', (evt) => picturesContainerClick(evt, pictures));
  bigPicture.addEventListener('click', onBigPictureClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};
export {setListenersOnBigPicture};
