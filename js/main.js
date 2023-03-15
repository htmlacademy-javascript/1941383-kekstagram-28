import {createPictures} from './data.js';
import {renderThumbnails} from './thumbnail-rendering.js';
import './full-screen-picture.js';

const similarPictures = createPictures();
renderThumbnails(similarPictures);

export{similarPictures};
