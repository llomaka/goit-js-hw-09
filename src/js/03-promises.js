import { Notify } from 'notiflix';

const refs = {
  form: document.forms[0],
  delay: document.forms[0].delay,
  step: document.forms[0].step,
  amount: document.forms[0].amount,
  button: document.querySelector('button'),
}

refs.button.addEventListener('click', onClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onClick(event) {
  event.preventDefault();
  if (refs.delay.value < 0 || refs.step.value < 0 || refs.amount.value < 0) {
    return Notify.failure('Enter positive values in mandatory fields: First delay, Delay step and Amount');
  }
  console.log(refs.delay.value, refs.step.value, refs.amount.value);

  refs.form.reset();
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });