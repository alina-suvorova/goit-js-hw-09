

const startButton =  document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let interval = null;

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);

function getRandomHexColor(){
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartButtonClick(){
    interval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
    stopButton.removeAttribute('disabled');
    startButton.setAttribute('disabled', true);
}
    
function onStopButtonClick(){
    clearInterval(interval);
    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', true);
}

