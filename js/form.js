import {body} from './full-screen-picture.js';
import {isEscapeKey} from './util.js';
import {resetEffects} from './filters.js';
import {imagePreview} from './filters.js';
import {validateHashTag} from './validation.js';
import {getOnlyNumber} from './util.js';
import {showAlert} from './util.js';
import {sendData} from './api.js';

const SCALE_VALUE = `${100}%`;

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const uploadFile = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashTags = imgUploadForm.querySelector('#hashtags');
const textDescription = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const scaleControlValue = document.querySelector('.scale__control--value');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const closeUserModal = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  hashTags.value = '';
  textDescription.value = '';
  scaleControlValue.value = '';
  resetEffects();
};

const onCloseUploadKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const closeUploadPicture = (evt) => {
  if(evt.target.closest('.img-upload__cancel')) {
    closeUserModal();
  }
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

const setFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch((err) => {
          showAlert(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
};

pristine.addValidator(hashTags, validateHashTag, 'Ошибка в написании хештега');

export {SCALE_VALUE, scaleControlValue,setFormSubmit,closeUserModal};
