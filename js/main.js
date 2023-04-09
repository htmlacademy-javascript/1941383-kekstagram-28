import {setListenersOnBigPicture} from './full-screen-picture.js';
import './filters.js';
import './scale.js';
import {render} from './thumbnail-rendering.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setFormSubmit, closeUserModal, showMessageOnSuccess, showErrorMessage} from './form.js';

try {
  const similarPictures = await getData();
  render(similarPictures);
  setListenersOnBigPicture(similarPictures);
  setFormSubmit(closeUserModal,showMessageOnSuccess, showErrorMessage);
} catch (err) {
  showAlert(err.message);
}
