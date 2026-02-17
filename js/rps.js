let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/


document.querySelector('.js-autoplay-btn').addEventListener('click', () => {
  autoplay();
});

let isAutoplay = false;
let intervailId;

function autoplay() {
  if (!isAutoplay) {
    intervailId = setInterval(() => { //* Here Arrow function is used instead of -> like this setInerval(function()).
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoplay = true;
  }
  else {
    clearInterval(intervailId);
    isAutoplay = false;
  }
}

document.querySelector('.js-rock-btn').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-btn').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissor-btn').addEventListener('click', () => {
  playGame('scissors');
});
//* Adding the eventLister for event when we press r,p,s game works.

document.addEventListener('keydown',(event) =>{
  if(event.key === 'r' || event.key === 'R'){
    playGame('rock');
  }
  else if (event.key === 'p' || event.key === 'P'){
    playGame('paper');
  }
  else if (event.key === 's' || event.key === 'S'){
    playGame('scissors');
  }
})

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
<img src="../images/${playerMove}-emoji.png" class="move-icon">
<img src="../images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

document.querySelector('.js-reset-btn').addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
});

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

