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

function getHumanChoice() {
  let userInput = prompt();
  return userInput;
}

/* let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
  let fix = humanChoice.toLowerCase();
  if (fix === computerChoice) {
    console.log("It's a tie!");
  } else if (fix === 'paper' && computerChoice === 'scissors') {
    console.log('You lose!');
    computerScore++;
  } else if (fix === 'rock' && computerChoice === 'paper') {
    console.log('You lose!');
    computerScore++;
  } else if (fix === 'scissors' && computerChoice === 'rock') {
    console.log('You lose!');
    computerScore++;
  } else {
    console.log('You win!');
    humanScore++;
  }
}*/

function playGame() {
  let humanScore = 0;
  let computerScore = 0;
  function playRound(humanChoice, computerChoice) {
    let fix = humanChoice.toLowerCase();
    if (fix === computerChoice) {
      console.log("It's a tie!");
    } else if (fix === 'paper' && computerChoice === 'scissors') {
      console.log('You lose!');
      computerScore++;
    } else if (fix === 'rock' && computerChoice === 'paper') {
      console.log('You lose!');
      computerScore++;
    } else if (fix === 'scissors' && computerChoice === 'rock') {
      console.log('You lose!');
      computerScore++;
    } else {
      console.log('You win!');
      humanScore++;
    }
  }

  for (let x = 0; x < 5; x++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  }
  const scoreBoard = `Your score ${humanScore} Computer score ${computerScore}`;
  if (humanScore > computerScore) {
    console.log('Congartulation you won the game! ' + scoreBoard);
  } else if (humanScore < computerScore) {
    console.log('You lost the game! ' + scoreBoard);
  } else {
    console.log('You tied the game ' + scoreBoard);
  }
}
