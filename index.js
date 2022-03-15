/**
 * Returns a random value from the provided array
 * @param {array} choices - An array of values with at least a single value that represents diffrent choices
 */
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

/**
 * Determines a winner based on two player inputs and an array of valid choices
 * Returns 1 if player1 wins
 * Returns 2 if player2 wins
 * Returns 0 if it's a tie
 * @param {string} player1 - A string value containing the choice entered by the first player
 * @param {string} player2 - A string value containing the choice entered by the second player
 * @param {array} possibilities - An array of values containing the valid choices
 */
function playRound(playerOneSelection, playerTwoSelection, possibilities) {
  if (
    verifyStringInput(playerOneSelection) &&
    verifyStringInput(playerTwoSelection)
  ) {
    // Normalize player input string for both players
    playerOneSelection = playerOneSelection.toLowerCase();
    playerTwoSelection = playerTwoSelection.toLowerCase();
  }
  if (
    verifyArrayInput(possibilities) &&
    verifyPlayerChoice(playerOneSelection, possibilities) &&
    verifyPlayerChoice(playerTwoSelection, possibilities)
  ) {
    const [rock, paper, scissors] = possibilities;

    if (playerOneSelection === playerTwoSelection) {
      return 0;
    } else if (playerOneSelection === paper && playerTwoSelection === rock) {
      return 1;
    } else if (playerOneSelection === rock && playerTwoSelection === scissors) {
      return 1;
    } else if (
      playerOneSelection === scissors &&
      playerTwoSelection === paper
    ) {
      return 1;
    } else {
      return 2;
    }
  }
}

/**
 * Returns a string that represents the outcome of the game
 * @param {string} player1Selection - The first player selection
 * @param {string} player2Selection - The second player selection
 * @param {array} possibilities - A list of possible choices
 */
function play(player1Selection, player2Selection, possibilities) {
  console.log({ player1Selection, player2Selection });
  const winner = playRound(player1Selection, player2Selection, possibilities);

  switch (winner) {
    case 0:
      return `It's a tie! Player 1 chose ${capitalize(
        player1Selection
      )} and Player 2 chose ${player2Selection}`;
    case 1:
      return `${capitalize(player1Selection)} beats ${capitalize(
        player2Selection
      )}! Player 1 wins!`;
    case 2:
      return `${capitalize(player2Selection)} beats ${capitalize(
        player1Selection
      )} Player 2 wins!`;
    default:
      return;
  }
}

/**
 * Returns a capitalized string
 * @param {string} str - The string to capitalize
 */
function capitalize(str = "") {
  if (typeof str === "string") {
    const normalizedStr = str.toLowerCase();
    return normalizedStr[0].toUpperCase() + normalizedStr.slice(1);
  }
  throw new Error(`Please provide a valid string! You entered: ${typeof str}`);
}

/**
 * Check if input is of type string, otherwise throws an error
 * @param {string} str - The string to verify
 */
function verifyStringInput(input) {
  console.log({ input });
  if (typeof input === "string") return true;
  throw new Error(
    `Input must be a string. You entered ${JSON.stringify(input)}`
  );
}

/**
 * Returns true if input is of type array that contains "rock", "paper", "scissors" as values
 * Otherwise throws an error
 * @param {array} arr - The array to verify
 */
function verifyArrayInput(arr) {
  if (Array.isArray(arr)) {
    const sanityCheck = arr.every(
      (v) => v === "rock" || v === "paper" || v === "scissors"
    );
    if (!sanityCheck || arr.length !== 3) {
      throw new Error(
        `Please provide a valid array of values that contain: 'rock', 'paper' and 'scissors' as values. You entered: ${JSON.stringify(
          arr
        )}`
      );
    }
  }
  return true;
}

/**
 * Returns true if player choice is valid
 * Otherwise throws an error
 * @param {string} choice - The string to verify agains the choices array
 * @param {array} choices - The array of available choices
 */
function verifyPlayerChoice(choice, choices) {
  if (choices.includes(choice)) return true;
  throw new Error(
    `Please enter a valid choice from => ${JSON.stringify(
      choices
    )}. Invalid player choice => ${JSON.stringify(choice)}`
  );
}

function game(rounds = 5) {
  const scoreBoard = {
    playerOne: 0,
    playerTwo: 0,
    ties: 0,
  };

  const possibilities = ["rock", "paper", "scissors"];

  const playerOne = prompt(
    "Welcome to Rock - Paper - Scissors! Please enter your choice: "
  );
  const playerTwo = computerPlay(possibilities);

  for (let i = 0; i < rounds; i++) {
    play(playerOne, playerTwo, possibilities);
  }
}
