
import {setListenersOnBigPicture} from './full-screen-picture.js';
import './filters.js';
import './scale.js';
import {render} from './thumbnail-rendering.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setFormSubmit, closeUserModal, showMessageOnSuccess, showErrorMessage} from './form.js';

const similarPictures = await getData()
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setListenersOnBigPicture();
setFormSubmit(closeUserModal,showMessageOnSuccess, showErrorMessage);
render(similarPictures);

export{similarPictures};
