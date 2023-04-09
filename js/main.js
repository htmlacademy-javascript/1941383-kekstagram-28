import {setListenersOnBigPicture} from './full-screen-picture.js';
import './filters.js';
import {render} from './thumbnail-rendering.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setListenersOnScaleButtons} from './scale.js';
import {setFormSubmit, closeUserModal, showMessageOnSuccess, showErrorMessage, setFormValidator} from './form.js';

try {
  const similarPictures = await getData();
  render(similarPictures);
  setListenersOnBigPicture(similarPictures);
  setFormValidator();
  setListenersOnScaleButtons();
  setFormSubmit(closeUserModal,showMessageOnSuccess, showErrorMessage);
} catch (err) {
  showAlert(err.message);
}
