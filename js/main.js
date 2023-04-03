
import './full-screen-picture.js';
import './form.js';
import './filters.js';
import './scale.js';
import {renderThumbnails} from './thumbnail-rendering.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setFormSubmit, closeUserModal, showMessageOnSuccess, showErrorMessage} from './form.js';

let similarPictures = '';

setFormSubmit(closeUserModal,showMessageOnSuccess, showErrorMessage);

getData()
  .then((objects) => {
    similarPictures = objects;
    renderThumbnails(similarPictures);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

export{similarPictures};


