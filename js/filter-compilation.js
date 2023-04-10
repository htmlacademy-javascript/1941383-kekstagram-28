const PHOTO_COUNT = 10;

const imgFilters = document.querySelector('.img-filters');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');

const sortByComments = (data) => data.sort((a, b) => b.comments.length - a.comments.length);
const shufflePictures = (data) => data.sort(() => Math.random() - 0.5);

const chooseFilter = (filterType) => {
  filterDefault.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterType.classList.add('img-filters__button--active');
};

const setListenersOnFilters = (pictures, renderPictures) => {
  filterRandom.addEventListener('click', (evt) => {
    chooseFilter(evt.target);
    renderPictures(shufflePictures(pictures.slice()).slice(0, PHOTO_COUNT));
  });

  filterDefault.addEventListener('click', (evt) => {
    chooseFilter(evt.target);
    renderPictures(pictures);
  });

  filterDiscussed.addEventListener('click', (evt) => {
    chooseFilter(evt.target);
    renderPictures(sortByComments(pictures.slice()));
  });
};

export {imgFilters, setListenersOnFilters};
