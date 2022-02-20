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
        resolve(Notify.success(`✅ Fulfilled promise ${position} in ${position*delay}ms`));
      } else {
        reject(Notify.failure(`❌ Rejected promise ${position} in ${position*delay}ms`));
      }
    }, position*delay);
  });
}

function onClick(event) {
  event.preventDefault();
  if (refs.delay.value < 0 || refs.step.value < 0 || refs.amount.value < 0) {
    return Notify.failure('Enter positive values in mandatory fields: First delay, Delay step and Amount');
  }
  const firstDelayValue = refs.delay.value;
  const step = refs.step.value;
  const amount = refs.amount.value;
  setTimeout(() => {
    for (let i = 0; i < amount; i += 1) {
      createPromise(i + 1, step);
    }
  }, firstDelayValue);
  // refs.form.reset();
}

