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

console.log(computerPlay(["rock","paper", "scissors"]))