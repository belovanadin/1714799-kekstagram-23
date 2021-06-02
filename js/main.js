function getRandomNumber (min, max) {
  if (min < 0) {
    throw new Error('Ошибка! Введите положительное число');
  }
  if (min>max) {
    throw new Error('Ошибка! Некорректный диапазон');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNumber(2, 7);

function checkLengthString (anyLine, maxLine) {
  if (maxLine<= 140) {
  }
  return (anyLine.length <= maxLine);
  }
  checkLengthString('some text', 15);
