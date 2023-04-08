const PHOTO_COUNT = 10;

const imgFilters = document.querySelector('.img-filters');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');

const randomPictures = (data) => data.sort(() => Math.random() - 0.5).slice(0, PHOTO_COUNT);

const sortDescending = (data, key) => data.sort((user1, user2) => user2[key] > user1[key] ? 1 : -1);

const chooseFilter = (filterType) => {
  filterDefault.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterType.classList.add('img-filters__button--active');
};

const getRandomPhoto = (cb) => {
  filterRandom.addEventListener('click', (evt) => {
    chooseFilter(evt.target);
    cb();
  });
};

const getDefaultPhoto = (cb) => {
  filterDefault.addEventListener('click', (evt) => {
    chooseFilter(evt.target);
    cb();
  });
};

const getDiscussedPhoto = (cb) => {
  filterDiscussed.addEventListener('click', (evt) => {
    chooseFilter(evt.target);
    cb();
  });
};

export {imgFilters,getRandomPhoto, randomPictures, getDefaultPhoto, sortDescending, getDiscussedPhoto};
