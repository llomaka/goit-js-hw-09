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
let timerValue = {};
const currentDate = new Date();
const convertDateValues = function () {
  const selectedTime = dateFSelected.getTime();
  const currentTime = currentDate.getTime();
  timerValue = convertMs(selectedTime - currentTime);
  refs.days.textContent = timerValue.days;
  refs.hours.textContent = timerValue.hours;
  refs.minutes.textContent = timerValue.minutes;
  refs.seconds.textContent = timerValue.seconds;
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateFSelected = selectedDates[0];
    convertDateValues();
  },
};

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

const checkPastBelonging = function (dateValue) {
  // if (dateValue)
  return true;
};

refs.button.disabled = true;
const selectedDate = flatpickr('#datetime-picker', options);
selectedDate.config.onChange.push(function () { refs.button.disabled = false });


// console.log(selectedDate);

// console.log(addLeadingZero('3'));
// window.alert('Please choose a date in the future');

//Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку notiflix.


