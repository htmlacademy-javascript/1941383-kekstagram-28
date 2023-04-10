import {setListenersOnBigPicture} from './full-screen-picture.js';
import './filters.js';
import {render, renderThumbnails} from './thumbnail-rendering.js';
import {getData} from './api.js';
import {setListenersOnFilters} from './filter-compilation.js';
import {showAlert, debounce} from './util.js';
import {setListenersOnScaleButtons} from './scale.js';
import {setFormSubmit, closeUserModal, showMessageOnSuccess, showErrorMessage, setFormValidator} from './form.js';

const TIMEOUT_DELAY = 500;

try {
  const similarPictures = await getData();
  render(similarPictures);
  setListenersOnBigPicture(similarPictures);
  setFormValidator();
  setListenersOnScaleButtons();
  setListenersOnFilters(similarPictures, debounce(renderThumbnails, TIMEOUT_DELAY));
  setFormSubmit(closeUserModal,showMessageOnSuccess, showErrorMessage);
} catch (err) {
  showAlert(err.message);
}
