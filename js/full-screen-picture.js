import {pictures} from './thumbnail-rendering.js';
const bigPicture = document.querySelector('.big-picture');

function openBigPicture (evt) {
  if (evt.target.closest('.picture')) {
    bigPicture.classList.remove('hidden');
  }

}

pictures.addEventListener('click', openBigPicture);


