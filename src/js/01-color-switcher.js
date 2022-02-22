const refs = {
  body: document.querySelector('body'),
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
};

const getRandomHexColor = function () {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const changeBodyColor = function () {
  refs.body.style.backgroundColor = getRandomHexColor();
};

const onButtonsClick = function (event) {
  if (event.target.nodeName !== 'BUTTON') return;
  if (event.target.dataset.hasOwnProperty('start')) {
    refs.stopButton.disabled = false;
    refs.startButton.disabled = true;
    refs.interval = setInterval(changeBodyColor, 1000);
    return;
  }
  if (event.target.dataset.hasOwnProperty('stop')) {
    refs.stopButton.disabled = true;
    refs.startButton.disabled = false;
    clearInterval(refs.interval);
    // refs.body.style.backgroundColor = 'initial';
    return;
  }
};

refs.stopButton.disabled = true;
refs.body.addEventListener('click', onButtonsClick);
