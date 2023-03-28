import {body} from './full-screen-picture.js';
import {isEscapeKey} from './util.js';
import {resetEffects} from './filters.js';
import {imagePreview} from './filters.js';
import {validateHashTag} from './validation.js';
import {getOnlyNumber} from './util.js';

const SCALE_VALUE = `${100}%`;

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const uploadFile = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashTags = imgUploadForm.querySelector('#hashtags');
const textDescription = document.querySelector('.text__description');

const scaleControlValue = document.querySelector('.scale__control--value');

const onCloseUploadKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadFile.value = '';
    hashTags.value = '';
    scaleControlValue.value = '';
    resetEffects();
  }
};

const closeUploadPicture = (evt) => {
  if(evt.target.closest('.img-upload__cancel')) {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    resetEffects();
  }
  uploadFile.value = '';
  document.removeEventListener('keydown', onCloseUploadKeydown);
};

const onStopEsc = (inputName) => {
  inputName.addEventListener('keydown', (evt) =>{
    if(inputName === document.activeElement){
      if (evt.key === 'Escape') {
        evt.stopPropagation();
      }
    }
  });
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

imgUploadInput.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onCloseUploadKeydown);
  scaleControlValue.value = SCALE_VALUE;
  imagePreview.style.transform = `scale(${getOnlyNumber(scaleControlValue.value) / 100})`;
});

onStopEsc(hashTags);
onStopEsc(textDescription);

imgUploadCancel.addEventListener('click', closeUploadPicture);

imgUploadForm.addEventListener('input', () => {
  if(pristine.validate()) {
    imgUploadForm.querySelector('.img-upload__submit').disabled = false;
  } else {
    imgUploadForm.querySelector('.img-upload__submit').disabled = true;
  }
});

pristine.addValidator(hashTags, validateHashTag, 'Ошибка в написании хештега');

export {SCALE_VALUE, scaleControlValue};
