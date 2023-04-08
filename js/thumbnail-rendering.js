import {debounce} from './util.js';
const RERENDER_DELAY = 500;

const pictures = document.querySelector('.pictures'); //сюда вставляем

const renderThumbnails = (picturesArray) => {
  const picture = document.querySelector('#picture').content.querySelector('.picture'); //шаблон который копируем

  const similarListFragment = document.createDocumentFragment();

  picturesArray.forEach(({url, likes, comments, id}) => {
    const pictureElement = picture.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__img').setAttribute('data-id', id);
    similarListFragment.appendChild(pictureElement);
  });

  const pictureArray = pictures.querySelectorAll('.picture');
  pictureArray.forEach((element) => element.remove());
  pictures.appendChild(similarListFragment);
};

const debounceRenderGallery = (data) => debounce(() => renderThumbnails(data), RERENDER_DELAY)();

export{renderThumbnails, pictures, debounceRenderGallery};
