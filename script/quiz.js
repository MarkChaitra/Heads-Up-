document.addEventListener('click', function initTilt() {
    document.removeEventListener('click', initTilt); // only run once
  
    if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().then(state => {
        if (state === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
        }
      });
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }
  });

let quizEndScreen = document.querySelector(`.quiz-end-screen`);
let quizWord = document.querySelector(`.quiz-word`);
let gameStatus = 'stopped';
let gettingChoice = 'Yes';
let choice;
let data;
  
function handleOrientation(event){

  let endScreen = document.querySelector(`.choices`);

  if(gameStatus === 'started'){

    if(event.gamma <= 30 && event.gamma > 0 && gettingChoice === 'Yes'){
      let p = document.createElement(`p`);

      p.textContent = choice;
      p.style.color = `green`;
      endScreen.appendChild(p);
      data = data.filter((answers) => answers != choice);

      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = 'green';  

      gettingChoice = 'No';
    }
    else if(event.gamma >= -30 && event.gamma < 0 && gettingChoice === 'Yes'){
      let p = document.createElement(`p`);

      p.textContent = choice;
      p.style.color = `red`;
      endScreen.appendChild(p);

      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = 'red'; 
      
      gettingChoice = 'No';
      
    }
    else if((event.gamma > 30 || event.gamma < -30) && gettingChoice === 'No'){
      gettingChoice = 'Yes';
      document.body.style.backgroundImage = 'linear-gradient(to right top, #9a3ce3, #8849e6, #7553e8, #605be9, #4a61e8, #3474f2, #1a85fa, #0095ff, #00b3ff, #00ceff, #00e6fd, #5ffbf1)';
      giveTopicChoice();
    }

  }
}

let topic = localStorage.getItem("topic");
window.onload = function addCategory(){
  document.querySelector('.quiz-category').innerHTML = 'Category: ' + topic;
};

(async () => {
    const response = await fetch('../topics.json');
    data = await response.json();
    data = data[topic];
})();

function countDown(){
  let startScreen = document.querySelector('.quiz-start-screen');
  let TimeDown = document.querySelector(`.quiz-count-down`);
  startScreen.style.display = 'none';

  let count = 5;
  const intervalId = setInterval(() => {
    TimeDown.textContent = count;
    count--;
    if (count === -1) {
      TimeDown.textContent = `Go!`;
      clearInterval(intervalId);
      gameStatus = 'started';

      setTimeout(giveTopicChoice, 1000);
      setTimeout(gameCountDown, 1000);

    }
  }, 1000); 

}

document.querySelectorAll('.quiz-home-button, .quiz-home-button-game').forEach(button => {
  button.addEventListener('click', () => {
    window.location.href = '../index.html';
  });
});

function gameCountDown(){
  let quizTimer = document.querySelector('.quiz-timer');
  let count = 60;
  const intervalId = setInterval(() => {
    quizTimer.textContent = count;
    count--;
    if (count === -1) {
      quizTimer.textContent = `Done`;
      quizWord.textContent = ``;
      clearInterval(intervalId);
      gameStatus = 'stopped';
      document.body.style.backgroundImage = 'linear-gradient(to right top, #9a3ce3, #8849e6, #7553e8, #605be9, #4a61e8, #3474f2, #1a85fa, #0095ff, #00b3ff, #00ceff, #00e6fd, #5ffbf1)';
      quizEndScreen.style.display = `block`;

    }
  }, 1000); 
}

function giveTopicChoice(){
  choice = data[Math.floor(Math.random()*data.length)];

  console.log(choice);

  quizWord.textContent = choice;


}
