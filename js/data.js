const getRandomNumber = (min, max) => {
  if (min < 0) {
    throw new Error('Ошибка! Введите положительное число');
  }
  if (min>max) {
    throw new Error('Ошибка! Некорректный диапазон');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkLengthString = (anyLine, maxLine) => anyLine.length <= maxLine;

checkLengthString('some text', 15);

const MAX_COUNT = 25;
const MAX_COMMENTS = 3;
const MAX_AVATAR = 6;
const Likes = {
  MAX: 200,
  MIN: 15,
};
const Author = [
  'Вова',
  'Саша',
  'Настя',
  'Вика',
  'Соня',
  'Дима',
  'Артем',
  'Тася',
  'Лена',
];
const photos = [];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getComments = () => {
  const comments = [];

  for (let index = 0; index < getRandomNumber(1, MAX_COMMENTS); index++) {
    comments.push({
      id: getRandomNumber(1, MAX_COUNT),
      avatar: `img/avatar-${getRandomNumber(1, MAX_AVATAR)}.svg`,
      message: messages[getRandomNumber(0, messages.length - 1)],
      name: getRandomNumber(Author),
    });
  }

  return comments;
};

const addPhotos = () => {
  for (let index = 0; index < MAX_COUNT; index++) {
    photos.push({
      id: getRandomNumber(1, MAX_COUNT),
      url: `photos/${index + 1}.jpg`,
      description: 'самое лучшее фото',
      likes: getRandomNumber(Likes.MIN, Likes.MAX),
      comments: [getComments()],
    });
  }
};

addPhotos();
export {photos};
