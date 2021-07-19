
const Url = {
  GET: 'https://23.javascript.pages.academy/kekstagram/data',
  POST: 'https://23.javascript.pages.academy/kekstagram',
};

const request = (onSuccess, onError, method, data) => {
  fetch(
    Url[method],
    {
      method: method,
      body: data,
    },
  )
    .then((response) => response.json())
    .then((photo) => {
      onSuccess(photo);
    }).catch(() => {
      onError();
    });
};

export {request};
