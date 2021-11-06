import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const inputAmount =  document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
};

const submitForm = (event) => {
  event.preventDefault();
  makePromises();
}
form.addEventListener('submit', submitForm);

const makePromises = () => {
  let numberOfDelay = Number(inputDelay.value);
  let numberOfStep = Number(inputStep.value);
  let numberOfAmount = Number(inputAmount.value);

  for (let i = 1; i <= numberOfAmount; i++) {
    createPromise(i, numberOfDelay)
    .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
    numberOfDelay += numberOfStep;
  }
}
 

