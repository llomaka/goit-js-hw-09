import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import '../css/02-timer.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('button', '[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

let dateFSelected;
let countdownId;
let timerValue = {};
const convertDateValues = function () {
  timerValue = convertMs(dateFSelected.getTime() - (new Date()).getTime());
  refs.days.textContent = timerValue.days.length > 2 ? timerValue.days : addLeadingZero(timerValue.days);
  refs.hours.textContent = addLeadingZero(timerValue.hours);
  refs.minutes.textContent = addLeadingZero(timerValue.minutes);
  refs.seconds.textContent = addLeadingZero(timerValue.seconds);
};
const countdownTimer = function () {
  refs.button.disabled = true;
  countdownId = setInterval(displayOnCountdown, 1000);
};
const displayOnCountdown = () => {
  if (dateFSelected < (new Date())) {
    console.log('Операция таймер успешно выполнена!');
    clearInterval(countdownId);
    countdownId = null;
    return;
  }
  convertDateValues();
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateFSelected = selectedDates[0];
  },
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

refs.button.disabled = true;
const selectDate = flatpickr('#datetime-picker', options);
selectDate.config.onOpen.push(function () {
  if (countdownId) {
    selectDate.close();
    return console.log('Timer is already performed! Wait for operation to complete.');
  }
});
selectDate.config.onClose.push(function () {
  if (dateFSelected.getTime() < (new Date()).getTime()) {
    return alert('Please choose a date in the future!');
  }
  if (countdownId) return;
  refs.button.disabled = false;
  convertDateValues();
  refs.button.addEventListener('click', countdownTimer, { once: true });
});

//Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку notiflix.
