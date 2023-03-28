
const MAX_LENGTH_TAG = 5;

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

export {validateHashTag};
