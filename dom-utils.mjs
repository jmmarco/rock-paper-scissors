import { mapTextToEmoji } from "./utils.mjs";

// Update the score - DOM
export function updateScoreboardResults(gameState) {
  const { humanPlayer, computerPlayer, rounds } = gameState;
  const scoreBoardContainer = document.querySelector(".scoreboard-container");
  const [humanScore, roundsRemaining, robotScore] =
    scoreBoardContainer.querySelectorAll("span");
  if (!humanScore && !robotScore && !roundsRemaining) return;
  roundsRemaining.textContent = rounds;
  humanScore.textContent = humanPlayer;
  robotScore.textContent = computerPlayer;
}

// Update the player moves - DOM
export function updateMoves(humanChoice, computerChoice) {
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
