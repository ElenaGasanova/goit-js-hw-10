// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
// Описанный в документации
import iziToast from 'izitoast';
// Дополнительный импорт стилей
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

let userSelectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      iziToast.show({
        message: `Please choose a date in the future`,
        messageColor: 'White',
        messageSize: '16px',
        backgroundColor: 'red',
        position: 'topRight',
      });
      startButton.setAttribute('disabled', '');
    } else {
      startButton.removeAttribute('disabled');
    }
  },
};

const calendar = flatpickr('#datetime-picker', options);
startButton.addEventListener('click', onBtnClick);

function onBtnClick() {
  inputEl.setAttribute('disabled', '');
  startButton.setAttribute('disabled', '');
  const intervalId = setInterval(() => {
    userSelectedDate = calendar.selectedDates[0].getTime() - Date.now();
    const updatedTime = convertMs(userSelectedDate);

    daysRef.textContent = addLeadingZero(updatedTime.days);
    hoursRef.textContent = addLeadingZero(updatedTime.hours);
    minutesRef.textContent = addLeadingZero(updatedTime.minutes);
    secondsRef.textContent = addLeadingZero(updatedTime.seconds);

    if (
      daysRef.textContent === '00' &&
      hoursRef.textContent === '00' &&
      minutesRef.textContent === '00' &&
      secondsRef.textContent === '00'
    ) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// console.log(String(1));
