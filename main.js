const introContainer = document.getElementsByClassName('introContainer')[0];
const playBtn = document.getElementById('playBtn');
const chooseRoundsContainer = document.getElementsByClassName(
  'chooseRoundsContainer'
)[0];
const roundOption1 = document.getElementById('roundOption1');
const roundOption2 = document.getElementById('roundOption2');
const roundOption3 = document.getElementById('roundOption3');
const roundOption4 = document.getElementById('roundOption4');
const scoreContainer = document.getElementsByClassName('scoreContainer')[0];
const roundsContainer = document.getElementsByClassName('roundsContainer')[0];
const arena = document.getElementsByClassName('arena')[0];
const rounds = document.getElementById('rounds');
const Rock = document.getElementById('rock');
const Paper = document.getElementById('paper');
const Scissors = document.getElementById('scissors');
const computerScore = document.getElementById('computerScore');
const playerScore = document.getElementById('playerScore');
const wrapper = document.getElementsByClassName('wrapper')[0];
const yourChoice = document.getElementById('yourChoice');
const computerChoiceDisplay = document.getElementById('computerChoice');
const roundWinnerDisplay = document.getElementById('roundWinner');
const playAgainBtn = document.getElementById('playAgain');
const weaponContainer = document.getElementsByClassName('weaponContainer')[0];
const tryAgainContainer =
  document.getElementsByClassName('tryAgainContainer')[0];
const chooseRoundsBtn = document.getElementById('chooseRoundsBtn');

//global variables
let cScore = 0;
let pScore = 0;
let roundCounter = 0;
let roundCountDisplay = 1;
let totalRounds;
let computerChoice;

//play button function
function play() {
  playBtn.style.display = 'none';
  chooseRoundsContainer.style.display = 'block';
}

//display arena
function displayGame(e) {
  e.preventDefault();
  introContainer.style.display = 'none';
  chooseRoundsContainer.style.display = 'none';
  scoreContainer.style.display = 'block';
  roundsContainer.style.display = 'block';
  arena.style.display = 'flex';
  totalRounds = parseInt(e.target.innerHTML);
  rounds.innerHTML = `Round: 1/${totalRounds}`;
}

//function that finds the round winner
function roundWinner(e) {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const playerChoice = e.target.innerHTML;
  computerChoice = choices[Math.floor(Math.random() * choices.length)];
  console.log(playerChoice, computerChoice);

  //store current values
  const prevPScore = pScore;
  const prevCScore = cScore;

  //player choice display
  yourChoice.style.display = 'block';
  yourChoice.innerHTML = `Your choice: ${e.target.innerHTML}`;

  //computer choice display
  computerChoiceDisplay.style.display = 'block';
  computerChoiceDisplay.innerHTML = `Computer choice: ${computerChoice}`;

  //display play again button
  playAgainBtn.style.display = 'block';

  //hide weapon choice container
  weaponContainer.style.display = 'none';

  //display round winner
  roundWinnerDisplay.style.display = 'block';

  //logic to get the round winner
  if (playerChoice === computerChoice) {
    // it's a tie
    roundWinnerDisplay.innerHTML = `Tie`;
  } else if (playerChoice === 'Rock') {
    if (computerChoice === 'Paper') {
      // computer wins
      roundWinnerDisplay.innerHTML = 'Paper beats Rock. Computer wins!';
      cScore++;
    } else {
      // player wins
      roundWinnerDisplay.innerHTML = 'Rock beats Scissors. You win!';
      pScore++;
    }
  } else if (playerChoice === 'Paper') {
    if (computerChoice === 'Scissors') {
      // computer wins
      roundWinnerDisplay.innerHTML = 'Scissors beats Paper. Computer wins!';
      cScore++;
    } else {
      // player wins
      roundWinnerDisplay.innerHTML = 'Paper beats Rock. You win!';
      pScore++;
    }
  } else if (playerChoice === 'Scissors') {
    if (computerChoice === 'Rock') {
      // computer wins
      roundWinnerDisplay.innerHTML = 'Rock beats Scissors. Computer wins!';
      cScore++;
    } else {
      // player wins
      roundWinnerDisplay.innerHTML = 'Scissors beats Paper. You win!';
      pScore++;
    }
  }

  //declare a winner after finishing rounds
  roundCounter++;
  console.log(roundCounter);

  //update player and computer score
  //update score after 3 seconds

  setTimeout(() => {
    if (pScore > prevPScore) {
      playerScore.innerHTML = `Score: ${pScore}`;
      playerScore.style.animation = 'score-stand-out 1.5s ease';
      playerScore.addEventListener('animationend', () => {
        playerScore.style.animation = '';
      });
    } else if (cScore > prevCScore) {
      computerScore.innerHTML = `Score: ${cScore}`;
      computerScore.style.animation = 'score-stand-out 1.5s ease';
      computerScore.addEventListener('animationend', () => {
        computerScore.style.animation = '';
      });
    } else return;
  }, 3000);
}

//play again button funtion

function playAgain() {
  //display weapon container
  weaponContainer.style.display = 'block';

  //update rounds
  roundCountDisplay++;
  rounds.innerHTML = `Round: ${
    roundCountDisplay > totalRounds ? roundCountDisplay - 1 : roundCountDisplay
  }/${totalRounds}`;

  //hide round winner and play again button
  yourChoice.style.display = '';
  computerChoiceDisplay.style.display = '';
  playAgainBtn.style.display = 'none';
  roundWinnerDisplay.style.display = '';

  //when rounds finish, declare winner
  if (roundCounter === totalRounds) {
    if (cScore > pScore) {
      roundWinnerDisplay.style.display = 'block';
      tryAgainContainer.style.display = 'block';
      weaponContainer.style.display = 'none';
      roundWinnerDisplay.innerHTML = 'Computer Wins!!';
      arena.style.animation = 'changeColor 2s ease forwards';
    } else if (pScore > cScore) {
      weaponContainer.style.display = 'none';
      roundWinnerDisplay.style.display = 'block';
      tryAgainContainer.style.display = 'block';
      arena.style.animation = 'changeColor 2s ease forwards';

      roundWinnerDisplay.innerHTML = 'Congratulations, You Won!!';
      arena.style.backgroundColor = 'lightGray';
    } else {
      weaponContainer.style.display = 'none';
      roundWinnerDisplay.style.display = 'block';
      tryAgainContainer.style.display = 'block';
      arena.style.animation = 'changeColor 2s ease forwards';

      roundWinnerDisplay.innerHTML = `Its a tie!!`;
      arena.style.backgroundColor = 'lightGray';
    }
  }
}

//function to handle choose rounds btn

function chooseRounds() {
  //set global variable values to initial state
  scoreContainer.style.display = 'none';
  roundsContainer.style.display = 'none';
  arena.style.backgroundColor = '';
  roundWinnerDisplay.style.display = '';
  arena.style.display = 'none';
  chooseRoundsContainer.style.display = 'block';
  roundCountDisplay = 1;
  roundCounter = 0;
  cScore = 0;
  pScore = 0;
  computerScore.innerHTML = `Score: ${cScore}`;
  playerScore.innerHTML = `Score: ${pScore}`;
  tryAgainContainer.style.display = 'none';
  weaponContainer.style.display = 'block';
  arena.style.animation = '';
}

//event listeners
playBtn.addEventListener('click', play);
roundOption1.addEventListener('click', displayGame);
roundOption2.addEventListener('click', displayGame);
roundOption3.addEventListener('click', displayGame);
roundOption4.addEventListener('click', displayGame);
Rock.addEventListener('click', roundWinner);
Paper.addEventListener('click', roundWinner);
Scissors.addEventListener('click', roundWinner);
playAgainBtn.addEventListener('click', playAgain);
chooseRoundsBtn.addEventListener('click', chooseRounds);
