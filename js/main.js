import {createPictures} from './data.js';
import {renderThumbnails} from './thumbnail-rendering.js';
import './full-screen-picture.js';
import './form.js';
import './filters.js';
import './scale.js';

const similarPictures = createPictures();
renderThumbnails(similarPictures);

export{similarPictures};
