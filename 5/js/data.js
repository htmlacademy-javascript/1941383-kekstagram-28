import {createIdGeneratorRandom} from './util.js';
import {createIdGenerator} from './util.js';
import {getRandomInteger} from './util.js';


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
const MAX_COMMENTS_COUNT = 25;
const MAX_PHOTO_ID_COUNT = 25;
const MAX_PHOTO_ADDRESS_COUNT = 25;
const MAX_GENERATE_LIKES = 200;
const MAX_AVATAR_COUNT = 6;

const generateCommentId = createIdGenerator();

const createComments = () => (
  {
    id: generateCommentId(),
    avatar: `img/${getRandomInteger(1, MAX_AVATAR_COUNT)}.svg`,
    message: MESSAGE_TEXT_PARAGRAPH[getRandomInteger(0, MESSAGE_TEXT_PARAGRAPH.length - 1)],
    name: USER_NAME[getRandomInteger(0, USER_NAME.length - 1)]
  }
);

const generatePhotoId = createIdGeneratorRandom(1, MAX_PHOTO_ID_COUNT);
const generatePhotoAddres = createIdGeneratorRandom(1, MAX_PHOTO_ADDRESS_COUNT);
const generatePhotoDescription = createIdGeneratorRandom(0, PHOTOS_DESCRIPTION.length - 1);
const generatePhotoLikes = createIdGeneratorRandom(1, MAX_GENERATE_LIKES);

const createDescription = () => (
  {
    id: generatePhotoId(),
    url: `photos/${generatePhotoAddres()}.jpg`,
    description: PHOTOS_DESCRIPTION[generatePhotoDescription()],
    likes: generatePhotoLikes(),
    comments: Array.from({length: getRandomInteger(1, MAX_COMMENTS_COUNT)}, createComments),
  }
);

const createPictures = () => Array.from({length: CREATE_DESCRIPTION_COUNT}, createDescription);

export {createPictures};
