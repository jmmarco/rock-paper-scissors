export function computerPlay(choices = ["rock", "paper", "scissors"]) {
  if (Array.isArray(choices) && choices.length > 0) {
    return choices[Math.floor(Math.random() * choices.length)];
  }
  throw new Error(
    `Please provide a valid array of values! You entered: ${JSON.stringify(
      choices
    )}`
  );
}

function checkPlayerSelection(
  selection,
  values = ["rock", "paper", "scissors"]
) {
  return values.includes(selection);
}

export function mapTextToEmoji(textStr) {
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


export function playRound(playerOneSelection, playerTwoSelection) {
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
  // rock > scissors / paper > rock / scissors > paper
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