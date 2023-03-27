
const imagePreview = document.querySelector('.img-upload__preview img');

const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max
    },
    start: chosenEffect.max,
    step: chosenEffect.step,
  });

  if(isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onEffectsChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imagePreview.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imagePreview.style.filter = isDefault()
    ? DEFAULT_EFFECT.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevelElement.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
hideSlider();

effectsElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects, imagePreview};

/*

//вариант 2

console.log(sliderValueElement.value);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  sliderValueElement.value = sliderElement.noUiSlider.get();
  //imagePreview.style.filter = `grayscale(${sliderValueElement.value})`;
});

const updateSlider = (value) => {

  if(value === 'none'){
    imgUploadEffectLevel.classList.add('hidden');
  } else
  if(value === 'chrome') {
    imgUploadEffectLevel.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });

    //imagePreview.style.filter = `grayscale(${stil})`; //как здесь получить нормальный value
  } else
  if(value === 'marvin'){
    imgUploadEffectLevel.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 1,
      step: 1
    });
  } else
  if(value === 'sepia'){
    imgUploadEffectLevel.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 1,
      step: 1
    });
  } else
  if(value === 'phobos'){
    imgUploadEffectLevel.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 1,
      step: 0.1
    });
  } else
  if(value === 'heat'){
    imgUploadEffectLevel.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3
      },
      start: 1,
      step: 0.1
    });
  }
};

effectsList.addEventListener('change', (evt) => {
  const effect = evt.target.closest('input[type="radio"]').value;
  imagePreview.className = `effects__preview--${evt.target.value}`;
  updateSlider(effect);
});

*/

//вариант 1
/*
effectsList.addEventListener('change', (evt) => {
  if(!evt.target.checked) {
    return;
  }
  imagePreview.className = evt.target.value;
  imgUploadEffectLevel.classList.add('hidden');
  if(evt.target.value === 'effects__preview--none'){
    imgUploadEffectLevel.classList.add('hidden');
  } else
  if(evt.target.value === 'effects__preview--chrome') {
    imgUploadEffectLevel.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
    sliderElement.noUiSlider.on('update', () => {
      sliderValueElement.value = sliderElement.noUiSlider.get();
    });
    imagePreview.style.filter = `grayscale(${sliderValueElement.value})`; //как здесь получить нормальный value
  } else
  if(evt.target.value === 'effects__preview--marvin'){
    imgUploadEffectLevel.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 1,
      step: 1
    });
  } else
  if(evt.target.value === 'effects__preview--sepia'){
    imgUploadEffectLevel.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 1,
      step: 1
    });
  } else
  if(evt.target.value === 'effects__preview--phobos'){
    imgUploadEffectLevel.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 1,
      step: 0.1
    });
  } else
  if(evt.target.value === 'effects__preview--heat'){
    imgUploadEffectLevel.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3
      },
      start: 1,
      step: 0.1
    });
  }
});

*/
