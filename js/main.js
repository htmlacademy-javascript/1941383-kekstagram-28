
import './full-screen-picture.js';
import './form.js';
import './filters.js';
import './scale.js';
import './filter-compilation.js';
import {renderThumbnails, debounceRenderGallery} from './thumbnail-rendering.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {imgFilters, getRandomPhoto,randomPictures, getDefaultPhoto, getDiscussedPhoto,descendingSort} from './filter-compilation.js';
import {setFormSubmit, closeUserModal, showMessageOnSuccess, showErrorMessage} from './form.js';

let similarPictures = '';
const sortKey = 'comments';

setFormSubmit(closeUserModal,showMessageOnSuccess, showErrorMessage);

getData()
  .then((objects) => {
    similarPictures = objects;
    imgFilters.classList.remove('img-filters--inactive');
    renderThumbnails(similarPictures);
    getDefaultPhoto(() => debounceRenderGallery(similarPictures.slice()));
    getRandomPhoto(() => debounceRenderGallery(randomPictures(similarPictures.slice())));
    getDiscussedPhoto(() => debounceRenderGallery(descendingSort(similarPictures.slice(), sortKey)));
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

export{similarPictures};
