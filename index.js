function computerPlay(choices = ["rock", "paper", "scissors"]) {
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
  if (
    !checkPlayerSelection(playerOneSelection) ||
    !checkPlayerSelection(playerTwoSelection)
  ) {
    throw new Error(
      `Invalid player selection.\nPlayer one: ${JSON.stringify(
        playerOneSelection
      )}\nPlayer two: ${JSON.stringify(playerTwoSelection)} `
    );
  }
  // rock > scissors - paper > rock - scissors > paper
  if (playerOneSelection === playerTwoSelection) {
    return 0;
  } else if (
    playerOneSelection === "rock" &&
    playerTwoSelection === "scissors"
  ) {
    return 1;
  } else if (playerOneSelection === "paper" && playerTwoSelection === "rock") {
    return 1;
  } else if (
    playerOneSelection === "scissors" &&
    playerTwoSelection === "paper"
  ) {
    return 1;
  } else {
    return 2;
  }
}

function init() {
  scoreBoard = resetScoreBoard();
  appendScoreboardResults(scoreBoard);
  window.addEventListener("click", start);
  const btnRock = document.getElementById('btn-rock');
  const btnPaper = document.getElementById('btn-paper');
  const btnScissors = document.getElementById('btn-scissors');

  [btnRock, btnPaper, btnScissors].forEach((el) => {
    el.classList.contains("hidden") && el.classList.toggle("hidden")
  })
}

function checkPlayerSelection(
  selection,
  values = ["rock", "paper", "scissors"]
) {
  return values.includes(selection);
}

function start(e) {
  console.log("fired");
  console.log(e.target.id);

  if (e.target.id === "btn-start") {
    const optionsContainer = document.querySelector(".options-container");
    optionsContainer.classList.toggle("hidden");
    const controlsContainer = document.querySelector(".controls-container");
    if (controlsContainer) controlsContainer.classList.toggle("hidden");
    const scoreBoardContainer = document.querySelector(".scoreboard-container");
    scoreBoardContainer.classList.toggle("hidden");
  }

  const value = e.target.dataset.value || e.target.parentElement.dataset.value;
  if (!value) return;
  const humanChoice = value;
  const computerChoice = computerPlay();
  const winner = playRound(humanChoice, computerChoice);

  if (winner === 1) {
    appendResults(humanChoice, computerChoice);
    scoreBoard.humanPlayer++;
  }
  if (winner === 2) {
    appendResults(humanChoice, computerChoice);
    scoreBoard.computerPlayer++;
  }
  if (winner === 0) {
    scoreBoard.ties++;
    appendResults(humanChoice, computerChoice);
  }
  scoreBoard.rounds--;
  if (scoreBoard.rounds === 0) {
    window.removeEventListener("click", start);
    const playAgainButton = document.getElementById("btn-play-again");
    // const controlsContainer = document.querySelector(".controls-container");
    const btnRock = document.getElementById("btn-rock");
    const btnPaper = document.getElementById("btn-paper");
    const btnScissors = document.getElementById("btn-scissors");

    [btnRock, btnPaper, btnScissors].forEach((el) => {
      el.classList.toggle("hidden");
    });
    playAgainButton.classList.toggle("hidden")
    playAgainButton.addEventListener('click', () => init())
  }

  console.log(scoreBoard);
  appendScoreboardResults(scoreBoard);
}

let scoreBoard = {
  humanPlayer: 0,
  computerPlayer: 0,
  ties: 0,
  rounds: 5,
};

init();

function mapTextToEmoji(textStr) {
  if (typeof textStr !== "string") return;
  switch (textStr.toLowerCase()) {
    case "rock":
      return "✊";
    case "paper":
      return "🖐";
    case "scissors":
      return "✌️";
    default:
      return;
  }
}

function appendResults(humanChoice, computerChoice) {
  const versus = document.querySelector(".versus");
  const leftChoice = document.createElement("span");
  const rightChoice = document.createElement("span");
  leftChoice.textContent = mapTextToEmoji(humanChoice);
  leftChoice.classList.add("left-choice-emoji");
  rightChoice.textContent = mapTextToEmoji(computerChoice);
  rightChoice.classList.add("right-choice-emoji");
  versus.textContent = "";
  versus.append(leftChoice, rightChoice);
}

function appendScoreboardResults(scoreboard) {
  const { humanPlayer, computerPlayer, rounds } = scoreBoard;
  const scoreBoardContainer = document.querySelector(".scoreboard-container");
  const [humanScore, roundsRemaining, robotScore] =
    scoreBoardContainer.querySelectorAll("span");
  if (!humanScore && !robotScore && !roundsRemaining) return;
  roundsRemaining.textContent = rounds;
  humanScore.textContent = humanPlayer;
  robotScore.textContent = computerPlayer;
}

function resetScoreBoard(scoreBoard) {
  return {
    humanPlayer: 0,
    computerPlayer: 0,
    ties: 0,
    rounds: 5,
  };
}
