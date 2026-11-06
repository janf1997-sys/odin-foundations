function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3) + 1;

  switch (choice) {
    case 1:
      return 'rock';
      break;
    case 2:
      return 'paper';
      break;
    case 3:
      return 'scissors';
  }
}
const container = document.querySelector('.btn-container');
container.addEventListener('click', e => {
  playRound(e.target.classList[1], getComputerChoice());
});

let humanScore = 0;
let computerScore = 0;
const result = document.querySelector('.result');
const score = document.querySelector('.score');
const restartBtn = document.querySelector('.restart');

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    result.textContent = "It's a tie!";
  } else if (
    (humanChoice === 'paper' && computerChoice === 'scissors') ||
    (humanChoice === 'rock' && computerChoice === 'paper') ||
    (humanChoice === 'scissors' && computerChoice === 'rock')
  ) {
    result.textContent = 'You lose!';
    computerScore++;
  } else {
    result.textContent = 'You win!';
    humanScore++;
  }
  score.textContent = `${humanScore}:${computerScore}`;

  if (humanScore === 5) {
    result.textContent = ' ';

    score.textContent = "Congratulations you've won the game!";
    disableButtons();
    restartBtn.style.display = 'block';
    restartBtn.addEventListener('click', resetGame);
  } else if (computerScore === 5) {
    result.textContent = ' ';

    score.textContent = 'You lost the game!';
    disableButtons();
    restartBtn.style.display = 'block';
    restartBtn.addEventListener('click', resetGame);
  }
}

function disableButtons() {
  const buttons = document.querySelectorAll('.choice');
  buttons.forEach(btn => (btn.disabled = true));
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;

  score.textContent = '0:0';
  result.textContent = 'Choose your weapon to start!';

  const buttons = document.querySelectorAll('.choice');
  buttons.forEach(btn => (btn.disabled = false));
  restartBtn.style.display = 'none';
}
