import { updateMoves, updateScoreboardResults } from "./dom-utils.mjs";
import { computerPlay, playRound } from "./utils.mjs";

const gameState = {
  humanPlayer: 0,
  computerPlayer: 0,
  ties: 0,
  rounds: 5,
};

const gameModule = {
  load() {
    window.addEventListener("click", gameModule.start);
  },
  start(e) {
    const { value } = e.target.dataset;
    if (!value) return;
    const humanChoice = value;
    const computerChoice = computerPlay();
    const winner = playRound(humanChoice, computerChoice);

    if (winner === 1) {
      gameState.humanPlayer++;
    }
    if (winner === 2) {
      gameState.computerPlayer++;
    }
    if (winner === 0) {
      gameState.ties++;
    }
    gameState.rounds--;

    if (gameState.rounds === 0) {
      window.removeEventListener("click", gameModule.start);
    }
    updateScoreboardResults(gameState);
    updateMoves(humanChoice, computerChoice);
  },
};

// Load the game
gameModule.load();
