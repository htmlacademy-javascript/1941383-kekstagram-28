import {createPictures} from './data.js';

const picture = document.querySelector('#picture')
  .content
  .querySelector('.picture'); //шаблон который копируем

const pictures = document.querySelector('.pictures'); //сюда вставляем

const similarPictures = createPictures();

const similarListFragment = document.createDocumentFragment();

similarPictures.forEach(({url, likes, comments}) => {
  const pictureElement = picture.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  similarListFragment.appendChild(pictureElement);
});

pictures.appendChild(similarListFragment);

export{pictures};

