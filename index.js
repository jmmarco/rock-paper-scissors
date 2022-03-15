/**
 * Returns a random value from the provided array
 * @param {array} possibilities - An array of values with at least a single value that represents diffrent possibilites
 */
function computerPlay(possibilities) {
  if (Array.isArray(possibilities) && possibilities.length > 0) {
    return possibilities[Math.floor(Math.random() * possibilities.length)];
  }
  throw new Error(
    `Please provide a valid array of values! You entered: ${JSON.stringify(
      possibilities
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
function determineWinner(player1, player2, possibilities) {
  // Normalize player input string for both players
  if (verifyStringInput(player1) && verifyStringInput(player2)) {
    player1 = player1.toLowerCase();
    player2 = player2.toLowerCase();
  }

  // Check of if possiblilies is an array
  if (Array.isArray(possibilities)) {
    // Ensure that the possibilites array has the correct values for the game
    const sanityCheck = possibilities.every(
      (v) => v === "rock" || v === "paper" || v === "scissors"
    );
    if (!sanityCheck || possibilities.length !== 3) {
      throw new Error(
        `Please provide a valid array of values that contain: 'rock', 'paper' and 'scissors' as values. You entered: ${JSON.stringify(
          possibilities
        )}`
      );
    }

    if (!possibilities.includes(player1) || !possibilities.includes(player2)) {
      throw new Error(
        `Please enter a valid option! Either: "rock", "paper" or "scissors".
        player 1 entered: "${player1}" and player 2 entered: "${player2}"`
      );
    }

    const [rock, paper, scissors] = possibilities;

    if (player1 === player2) {
      return 0;
    } else if (player1 === paper && player2 === rock) {
      return 1;
    } else if (player1 === rock && player2 === scissors) {
      return 1;
    } else if (player1 === scissors && player2 === paper) {
      return 1;
    } else {
      return 2;
    }
  }
}

function play(player1Selection, player2Selection, possibilities) {
  const winner = determineWinner(
    player1Selection,
    player2Selection,
    possibilities
  );

  switch (winner) {
    case 0:
      return `It's a tie!`;
    case 1:
      return `${capitalize(player1)} beats ${capitalize(
        player2
      )}! Player 1 wins!`;
    case 2:
      return `${capitalize(player2)} beats ${capitalize(
        player1
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
function verifyStringInput(str) {
  if (typeof str !== "string")
    throw new Error(`Input must be a string. You entered ${str}`);
}
