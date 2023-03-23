import {body} from './full-screen-picture.js';
import {isEscapeKey} from './util.js';
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
//const imgUploadLabel = document.querySelector('.img-upload__label');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const uploadFile = document.querySelector('#upload-file');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashTags = imgUploadForm.querySelector('#hashtags');
const MAX_LENGTH_TAG = 5;
const textDescription = document.querySelector('.text__description');


const onCloseUploadKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

imgUploadInput.addEventListener('change', () => {
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

const onStopEsc = (inputName) => {
  inputName.addEventListener('keydown', (evt) =>{
    if(inputName === document.activeElement){
      if (evt.key === 'Escape') {
        evt.stopPropagation();
      }
    }
  });
};

onStopEsc(hashTags);
onStopEsc(textDescription);

/*textDescription.addEventListener('keydown', (evt) =>{
  if(textDescription === document.activeElement){
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  }
});*/


const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

imgUploadForm.addEventListener('input', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if(isValid) {
    imgUploadForm.querySelector('.img-upload__submit').disabled = false;
  } else {
    imgUploadForm.querySelector('.img-upload__submit').disabled = true;
  }
});

//функция для проверки тегов на уникальность

const isUniqueHashTag = (value) => {
  const tagToLowercase = value.map((item) => item.toLowerCase());

  return tagToLowercase.length === new Set(tagToLowercase).size;
};

//проверка длины массива тегов

const isHashTagLength = (value) => {
  if(value.length <= MAX_LENGTH_TAG) {
    return true;
  }
};

const validateHashTag = (value) => {
  const valueElement = value.split(' '); //разделяет по пробелам

  const valueItem = valueElement.filter((element) => element.length >= 1); //удаляет пустые строки в массиве

  const isTagItemValid = valueItem.every((tagItem) => {
    const regexp = /^#[a-zа-яё0-9]{1,19}$/i;
    return regexp.test(tagItem);
  });

  return isTagItemValid && isUniqueHashTag(valueItem) && isHashTagLength(valueItem);
};

pristine.addValidator(hashTags, validateHashTag, isHashTagLength);
