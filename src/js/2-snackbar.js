// Описанный в документации
import iziToast from 'izitoast';
// Дополнительный импорт стилей
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const inputValue = formEl.elements.delay.value;
  const fulfilledRadio = formEl.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fulfilledRadio === 'fulfilled') {
        resolve(inputValue);
      } else {
        reject(inputValue);
      }
    }, inputValue);
  })
    .then(value => {
      iziToast.show({
        message: `Fulfilled promise in ${value} ms`,
        messageColor: 'White',
        messageSize: '16px',
        backgroundColor: 'green',
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.show({
        message: `Rejected promise in ${error} ms`,
        messageColor: 'White',
        messageSize: '16px',
        backgroundColor: 'red',
        position: 'topRight',
      });
    });

  console.dir(promise);
}
