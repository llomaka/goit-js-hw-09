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
        console.log(position, delay);
        resolve(Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
      } else {
        console.log(position, delay);
        reject(Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
}

function onClick(event) {
  event.preventDefault();
  if (refs.delay.value < 0 || refs.step.value < 0 || refs.amount.value < 0) {
    return Notify.failure('Enter positive values in mandatory fields: First delay, Delay step and Amount');
  }
  const firstDelayValue = Number(refs.delay.value);
  const step = Number(refs.step.value);
  const amount = refs.amount.value;
  Notify.init({
    timeout: 3000 + firstDelayValue + step,
  });
    for (let i = 0, j; i < amount; i += 1) {
      j = firstDelayValue + step * i;
      console.log(j);
      createPromise(i + 1, j);
    }
  // refs.form.reset();
}

