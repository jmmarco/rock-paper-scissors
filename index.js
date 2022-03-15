function computerPlay(choices) {
  if (Array.isArray(choices) && choices.length > 0) {
    return choices[Math.floor(Math.random() * choices.length)];
  }
  throw new Error(
    `Please provide a valid array of values! You entered: ${JSON.stringify(
      choices
    )}`
  );
}

function playRound(playerOneSelection, playerTwoSelection) {
  // rock > scissors - paper > rock - scissors > paper
  if (playerOneSelection === playerTwoSelection) {
    return 0;
  } else if (playerOneSelection === "rock" && playerTwoSelection === "scissors") {
    return 1;
  } else if (playerOneSelection === "paper" && playerTwoSelection === "rock") {
    return 1;
  } else if (playerOneSelection === "scissors" && playerTwoSelection === "paper") {
    return 1;
  } else {
    return 2;
  }
}

const playerSelection = "rock";
const computerSelection = computerPlay(["rock", "paper", "scissors"]);

function game(rounds = 5) {
  let scoreBoard = {
    playerOne: 0,
    playerTwo: 0,
    ties: 0,
  };

  for (let i = 0; i < rounds; i++) {
    const playerSelection = computerPlay(["rock", "paper", "scissors"]);
    const computerSelection = computerPlay(["rock", "paper", "scissors"]);

    const round = playRound(playerSelection, computerSelection);
    switch (round) {
      case 1:
        scoreBoard.playerOne++;
        break;
      case 2:
        scoreBoard.playerTwo++;
        break;
      case 0:
        scoreBoard.ties++;
        break;
      default:
        break;
    }
  }

  return scoreBoard;
}

const { playerOne, playerTwo, ties } = game();

console.log(
  playerOne === playerTwo
    ? "Tie game"
    : playerOne > playerTwo
    ? "Player one wins!"
    : "Player two wins!"
);

console.log("player one", playerOne);
console.log("player two", playerTwo);
console.log("ties", ties);
