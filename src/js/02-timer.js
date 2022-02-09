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

let dateFSelected;

// const flatpickrOptions = {
//   altInput: true,
//   altFormat: 'j F Y H:i',
//   dateFormat: 'Y-m-d H:i',
//   minDate: new Date().fp_incr(1),
// }
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateFSelected = selectedDates[0];
    console.log(dateFSelected);
  },
};

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
  return value.padStart(2, '0');
}

const checkPastBelonging = function (dateValue) {
  // if (dateValue)
  return true;
};

refs.button.disabled = true;
const selectedDate = flatpickr('#datetime-picker', options);
selectedDate.config.onChange.push(function () { refs.button.disabled = false });

console.log(selectedDate);

// console.log(addLeadingZero('3'));
// window.alert('Please choose a date in the future');

//Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку notiflix.


// flatpickr.parseDate(dateStr, dateFormat);
// console.log(date.toString());
const date = new Date();
// console.log(date.getTime()); // 1624021654154
// console.log("getDate(): ", date.getDate());
// // Повертає місяць від 0 до 11
// const month = date.getMonth() + 1;
// console.log("getMonth(): ", month);
// // Повертає рік з 4 цифр
// console.log("getFullYear(): ", date.getFullYear());
// // Повертає години
// console.log("getHours(): ", date.getHours());
// // Повертає хвилини
// console.log("getMinutes(): ", date.getMinutes());
// // Повертає секунди
// console.log("getSeconds(): ", date.getSeconds());
// date.setMinutes(50);
// console.log("Date: ", date);
// // "Sat Mar 16 2030 14:50:00 GMT+0200"
// console.log(date.toTimeString());
// // "14:25:00 GMT+0200 (Eastern European Standard Time)"
// console.log(date.toISOString());
// // "2030-03-16T12:25:00.000Z"
// console.log(date.toLocaleString());
// // "3/16/2030, 2:25:00 PM"
