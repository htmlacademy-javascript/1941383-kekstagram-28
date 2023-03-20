import {body} from './full-screen-picture.js';
import {isEscapeKey} from './util.js';
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadLabel = document.querySelector('.img-upload__label');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const uploadFile = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');


const onCloseUploadKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

imgUploadLabel.addEventListener('click', () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onCloseUploadKeydown);
});


const closeUploadPicture = (evt) => {
  if(evt.target.closest('.img-upload__cancel')) {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  }
  uploadFile.value = '';
  document.removeEventListener('keydown', onCloseUploadKeydown);
};

imgUploadCancel.addEventListener('click', closeUploadPicture);


const pristine = new Pristine(imgUploadForm, {
  classTo: 'text__hashtags',
  errorTextParent: 'setup-wizard-form__element',
  errorTextClass: 'setup-wizard-form__error-text',
});

//const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if(isValid){
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});
