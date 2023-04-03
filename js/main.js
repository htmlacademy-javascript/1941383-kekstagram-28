
import './full-screen-picture.js';
import './form.js';
import './filters.js';
import './scale.js';
import {createPictures} from './data.js';
import {renderThumbnails} from './thumbnail-rendering.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setFormSubmit, closeUserModal, showMessageOnSuccess} from './form.js';

let similarPictures = createPictures();

setFormSubmit(closeUserModal,showMessageOnSuccess);

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


//  https://28.javascript.pages.academy/kekstagram

