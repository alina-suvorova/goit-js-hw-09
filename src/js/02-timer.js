import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startButton = document.querySelector('[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');
let selectedDate = null;
let intervalId = null;

startButton.addEventListener('click', onStartButtonClick);

function onStartButtonClick(){
    intervalId = setInterval(() => {
      if (selectedDate <= Date.now()) {
        clearInterval(intervalId);
        return;
      }
    const { days, hours, minutes, seconds } = convertMs(selectedDate - new Date().getTime());
    spanDays.innerHTML = addZeroBefore(days);
    spanHours.innerHTML = addZeroBefore(hours);
    spanMinutes.innerHTML = addZeroBefore(minutes);
    spanSeconds.innerHTML = addZeroBefore(seconds);
    }, 1000);
    startButton.setAttribute('disabled', true);
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

function addZeroBefore(value) {
  return String(value).padStart(2, 0);
}

flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      selectedDate = selectedDates[0];
      if(selectedDate.getTime() < new Date().getTime()){
         Notify.failure('Please choose a date in the future');
         startButton.setAttribute('disabled', true);
         return;
      }
      startButton.removeAttribute('disabled');
     },
  });