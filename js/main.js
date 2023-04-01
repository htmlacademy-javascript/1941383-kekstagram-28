import {createPictures} from './data.js';
import {renderThumbnails} from './thumbnail-rendering.js';
import './full-screen-picture.js';
import './form.js';
import './filters.js';
import './scale.js';
import {setFormSubmit} from './form.js';
import {closeUserModal} from './form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

const similarPictures = createPictures();
//renderThumbnails(similarPictures);

setFormSubmit(closeUserModal);

getData()
  .then((objects) => {
    renderThumbnails(objects);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

export{similarPictures};


//  https://28.javascript.pages.academy/kekstagram

