var quiz = document.getElementById('quiz');
var score = document.getElementById('score');
var result = document.getElementById('result');
var number = document.getElementById('number');
var resultContainer = document.querySelector('.result-container');
var interval;
let correctAnswer;
let points = 0;
let count = 0;

function getRadioValue(radioName) {
  var radios = document.getElementsByName(radioName);
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i];
    }
  }
}

function startQuiz() {
  var oneMinutes = 15 * 1,
    display = document.querySelector('#time');
  startTimer(oneMinutes, display);
}

function checkAnswer() {
  var q1 = getRadioValue('q1');

  if (q1 === undefined) {
    quiz.reset();
    fetchData();
    clearInterval(interval);
    startQuiz();
    return;
  }
  var q1Answer = q1.nextElementSibling.innerHTML;
  if (q1Answer === correctAnswer) {
    points += 5;
    quiz.reset();
    fetchData();
    clearInterval(interval);
    startQuiz();
  } else {
    quiz.reset();
    fetchData();
    clearInterval(interval);
    startQuiz();
  }
}

quiz.addEventListener('submit', function (event) {
  event.preventDefault();
  checkAnswer();
  score.innerHTML = points;
  if (count === 10) {
    quiz.style.display = 'none';
    resultContainer.style.display = 'block';
    clearInterval(interval);
    result.style.display = 'block';
    result.innerHTML = 'Your score is: ' + points;
  }
  count++;
  number.innerHTML = 'Question ' + count + ' of 10';
});

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
      timer = duration;
      timeOut();
    }
  }, 1000);
}