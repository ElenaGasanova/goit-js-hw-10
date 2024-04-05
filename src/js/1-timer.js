// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startBtm = document.querySelector('[data-start]');
let userSelectedDate;

startBtm.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      alert('Please choose a date in the future');
    }
    startBtm.disabled = false;
    userSelectedDate = selectedDates[0];
  },
};

flatpickr(input, options);
