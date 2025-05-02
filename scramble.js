const words = ["python", "developer", "function", "variable", "loop", "string", "integer", "boolean", "dictionary", "tuple"];
let currentWord = "";
let scrambledWord = "";
let attempts = 3;
let score = 0;
let round = 1;

function scramble(word) {
  const letters = word.split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join('');
}

function startRound() {
  if (round > 5) {
    document.getElementById("message").textContent = `🎉 Game Over! Final Score: ${score}/5`;
    document.getElementById("scrambled-word").textContent = "";
    document.getElementById("attempts-left").textContent = "";
    document.getElementById("guess-input").disabled = true;
    return;
  }

  currentWord = words[Math.floor(Math.random() * words.length)];
  scrambledWord = scramble(currentWord);
  attempts = 3;

  document.getElementById("scrambled-word").textContent = scrambledWord;
  document.getElementById("round-info").textContent = `Round: ${round} / 5`;
  document.getElementById("attempts-left").textContent = `Attempts Left: ${attempts}`;
  document.getElementById("message").textContent = "";
  document.getElementById("guess-input").value = "";
  document.getElementById("guess-input").focus();
}

function checkGuess() {
  const guess = document.getElementById("guess-input").value.trim().toLowerCase();

  if (guess === currentWord) {
    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("message").textContent = "✅ Correct!";
    round++;
    setTimeout(startRound, 1000);
  } else {
    attempts--;
    if (attempts > 0) {
      document.getElementById("attempts-left").textContent = `Attempts Left: ${attempts}`;
      document.getElementById("message").textContent = "❌ Incorrect. Try again!";
    } else {
      document.getElementById("message").textContent = `🟥 Out of attempts! Word was '${currentWord}'.`;
      round++;
      setTimeout(startRound, 1500);
    }
  }
}

window.onload = startRound;
