import {createPictures} from './data.js';

const picture = document.querySelector('#picture')
  .content
  .querySelector('.picture'); //шаблон который копируем

const pictures = document.querySelector('.pictures'); //сюда вставляем

const similarPictures = createPictures();

const similarListFragment = document.createDocumentFragment();

similarPictures.forEach(({url, likes, comments, id}) => {
  const pictureElement = picture.cloneNode(true);
//console.log(id);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__img').setAttribute('data-id', id);
  similarListFragment.appendChild(pictureElement);
});

pictures.appendChild(similarListFragment);

export{pictures};
export{similarPictures};


