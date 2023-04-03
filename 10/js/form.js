import {body} from './full-screen-picture.js';
import {isEscapeKey} from './util.js';
import {resetEffects} from './filters.js';
import {imagePreview} from './filters.js';
import {validateHashTag} from './validation.js';
import {getOnlyNumber} from './util.js';
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
const error = document.querySelector('#error').content.querySelector('.error');

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

const hiddenUserModal = () => {
  imgUploadOverlay.classList.add('hidden');
};

const showhiddenUserModal = () => {
  imgUploadOverlay.classList.remove('hidden');
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

const closeMessageOnSuccess = () => {
  const sectionSuccess = document.querySelector('.success');
  sectionSuccess.remove();
};

const closeMessageOnSuccessKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessageOnSuccess();
  }
};

const closeMessageOnSuccessAnyClick = (evt) => {
  if(evt.target.closest('.success') && !evt.target.closest('.success__inner')) {
    closeMessageOnSuccess();
  }
};

const showMessageOnSuccess = () => {
  const success = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successTemp = success.cloneNode(true);
  const successButton = successTemp.querySelector('.success__button');
  successButton.addEventListener('click', closeMessageOnSuccess);
  successTemp.addEventListener('keydown', closeMessageOnSuccessKeydown);
  successTemp.addEventListener('click', closeMessageOnSuccessAnyClick);
  body.appendChild(successTemp);
};

const closeErrorMessage = () => {
  const sectionError = document.querySelector('.error');
  sectionError.remove();
  showhiddenUserModal();
};

const closeErrorMessageOnKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const closeErrorMessageOnAnyClick = (evt) => {
  if(evt.target.closest('.error') && !evt.target.closest('.error__inner')) {
    closeErrorMessage();
  }
};

const showErrorMessage = () => {
  const errorTemp = error.cloneNode(true);
  const errorButton = errorTemp.querySelector('.error__button');
  errorButton.addEventListener('click', closeErrorMessage);
  errorTemp.addEventListener('keydown', closeErrorMessageOnKeydown);
  errorTemp.addEventListener('click', closeErrorMessageOnAnyClick);
  hiddenUserModal();
  document.body.appendChild(errorTemp);
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const setFormSubmit = (onSuccess, showMessage, showError) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showMessage)
        .catch(showError)
        .finally(unblockSubmitButton);
    }
  });
};

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

pristine.addValidator(hashTags, validateHashTag, 'Ошибка в написании хештега');

export {SCALE_VALUE, scaleControlValue,setFormSubmit,closeUserModal, showMessageOnSuccess, closeMessageOnSuccess, showErrorMessage};