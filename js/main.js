
const PHOTOS_DESCRIPTION = [
  'пляж',
  'указатель к пляжу',
  'море',
  'девушка в купальнике',
  'рисовые человечки',
  'спорткар',
  'завтрак из клубники',
  'брусничный морс',
  'люди машут самолёту',
  'шкафчик для обуви',
  'вход на пляж',
  'автомобиль ауди',
  'вкусный салат',
  'кото-ролл',
  'робо-тапки',
  'вид из окна самолёта',
  'выступление хора',
  'раритетное авто',
  'тапки с подсветкой',
  'внутренний двор отеля',
  'корейская еда',
  'закат на море',
  'краб',
  'большой концерт',
  'сафари с бегемотом',
];

const MESSAGE_TEXT_PARAGRAPH = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const USER_NAME = [
  'Фёдор',
  'Виктория',
  'Герман',
  'Илья',
  'Тимофей',
  'Виктория'
];

const CREATE_DESCRIPTION_COUNT = 25;


const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createIdGeneratorRandom = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator();

const createComments = () => (
  {
    id: generateCommentId(),
    avatar: `img/${getRandomInteger(1, 6)}.svg`,
    message: MESSAGE_TEXT_PARAGRAPH[getRandomInteger(0, MESSAGE_TEXT_PARAGRAPH.length - 1)],
    name: USER_NAME[getRandomInteger(0, USER_NAME.length - 1)]
  }
);

const generatePhotoId = createIdGeneratorRandom(1, 25);
const generatePhotoAddres = createIdGeneratorRandom(1, 25);
const generatePhotoDescription = createIdGeneratorRandom(0, PHOTOS_DESCRIPTION.length - 1);
const generatePhotoLikes = createIdGeneratorRandom(1, 25);

const createDescription = () => (
  {
    id: generatePhotoId(),
    url: `photos/${generatePhotoAddres()}.jpg`,
    description: PHOTOS_DESCRIPTION[generatePhotoDescription()],
    likes: generatePhotoLikes(),
    comments: Array.from({length: getRandomInteger(1, 25)}, createComments),
  }
);

const createObjects = Array.from({length: CREATE_DESCRIPTION_COUNT}, createDescription);

const createObjectsFunction = () => createObjects;

createObjectsFunction();
