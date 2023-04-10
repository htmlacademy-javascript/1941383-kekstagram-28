import {debounce} from './util.js';
import {imgFilters, getDefaultPhoto, getRandomPhoto, getDiscussedPhoto, randomPictures, sortDescending} from './filter-compilation.js';

const RERENDER_DELAY = 500;
const SORT_KEY = 'comments';

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

const render = (data) => {
  imgFilters.classList.remove('img-filters--inactive');
  renderThumbnails(data);
  getDefaultPhoto(() => debounceRenderGallery(data.slice()));
  getRandomPhoto(() => debounceRenderGallery(randomPictures(data.slice())));
  getDiscussedPhoto(() => debounceRenderGallery(sortDescending(data.slice(), SORT_KEY)));
};

export{renderThumbnails, pictures, debounceRenderGallery, render};
