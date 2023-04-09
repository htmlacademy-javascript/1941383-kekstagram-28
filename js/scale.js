import {SCALE_VALUE} from './form.js';
import {scaleControlValue} from './form.js';
import {getOnlyNumber} from './util.js';
import {imagePreview} from './filters.js';

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const STEP_CHANGE_VALUE = 25;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');

scaleControlValue.value = SCALE_VALUE;


const setListenersOnScaleButtons = () => {
//обработчик уменьшения фото
scaleControlSmaller.addEventListener('click', () => {
  if(getOnlyNumber(scaleControlValue.value) <= MIN_SCALE_VALUE) {
    return;
  }
  scaleControlValue.value = `${getOnlyNumber(scaleControlValue.value) - STEP_CHANGE_VALUE}%`;
  const scaleValueToMin = `scale(${getOnlyNumber(scaleControlValue.value) / 100})`;
  imagePreview.style.transform = scaleValueToMin;
});

//обработчик увеличения фото
scaleControlBigger.addEventListener('click', () => {
  if(getOnlyNumber(scaleControlValue.value) >= MAX_SCALE_VALUE) {
    return;
  }
  scaleControlValue.value = `${getOnlyNumber(scaleControlValue.value) + STEP_CHANGE_VALUE }%`;
  const scaleValueToMax = `scale(${getOnlyNumber(scaleControlValue.value) / 100})`;
  imagePreview.style.transform = scaleValueToMax;
});

};

export {setListenersOnScaleButtons};

