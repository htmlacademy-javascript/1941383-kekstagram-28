
import './full-screen-picture.js';
import './form.js';
import './filters.js';
import './scale.js';
import './filter-compilation.js';
import {renderThumbnails, debounceRenderGallery} from './thumbnail-rendering.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {imgFilters, getRandomPhoto,randomPictures, getDefaultPhoto, getDiscussedPhoto, sortDescending} from './filter-compilation.js';
import {setFormSubmit, closeUserModal, showMessageOnSuccess, showErrorMessage} from './form.js';

const sortKey = 'comments';

const similarPictures = await getData()
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

const render = () => {
  imgFilters.classList.remove('img-filters--inactive');
  renderThumbnails(similarPictures);
  getDefaultPhoto(() => debounceRenderGallery(similarPictures.slice()));
  getRandomPhoto(() => debounceRenderGallery(randomPictures(similarPictures.slice())));
  getDiscussedPhoto(() => debounceRenderGallery(sortDescending(similarPictures.slice(), sortKey)));
};

setFormSubmit(closeUserModal,showMessageOnSuccess, showErrorMessage);
render();

export{similarPictures};
