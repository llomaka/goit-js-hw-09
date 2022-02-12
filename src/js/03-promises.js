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
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

function onClick(event) {
  event.preventDefault();
  if (refs.delay.value < 0 || refs.step.value < 0 || refs.amount.value < 0) {
    return Notify.failure('Enter positive values in mandatory fields: First delay, Delay step and Amount');
  }
  console.log(refs.delay.value, refs.step.value, refs.amount.value);

  refs.form.reset();
}