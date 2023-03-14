import {pictures} from './thumbnail-rendering.js';
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');

const openBigPicture = (evt) => {
  if (evt.target.closest('.picture')) {
    bigPicture.classList.remove('hidden');
  }
  bigPictureImg.querySelector('img').src = evt.target.closest('.picture__img').src;

  bigPicture.querySelector('.likes-count').textContent = evt.target.closest('.picture').querySelector('.picture__likes').textContent;
  bigPicture.querySelector('.social__caption').textContent = evt.target.closest('.picture').querySelector('.picture__description').textContent;
  bigPicture.querySelector('.comments-count').textContent = evt.target.closest('.picture').querySelector('.picture__comments').textContent;

};

pictures.addEventListener('click', openBigPicture); //открывает фотку

const closeBigPicture = (evt) => {
  if(evt.target.closest('.big-picture__cancel')) {
    bigPicture.classList.add('hidden');
  }
};

bigPicture.addEventListener('click', closeBigPicture); //закрывает фотку

const socialComment = () => document.querySelector('.social__comment').cloneNode(true);

console.log(socialComment());
