var words = ["apple", "banana", "cherry", "grape", "orange", "kiwi", "mango", "pear", "pineapple", "strawberry"];
var selectedWord = "";
var guessedLetters = [];
var incorrectGuesses = 0;
var wordDisplay = document.getElementById("wordDisplay");

function initializeGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  incorrectGuesses = 0;
  updateWordDisplay();
  document.getElementById("guessInput").value = "";
  document.getElementById("resultMessage").textContent = "";
}

function updateWordDisplay() {
  var displayedWord = "";

  for (var i = 0; i < selectedWord.length; i++) {
    if (guessedLetters.includes(selectedWord[i])) {
      displayedWord += selectedWord[i] + " ";
    } else {
      displayedWord += "_ ";
    }
  }

  wordDisplay.textContent = displayedWord;
}

function checkGuess() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value.toLowerCase();

  if (guess.length !== 1 || !guess.match(/[a-z]/i)) {
    document.getElementById("resultMessage").textContent = "Please enter a single letter.";
    return;
  }

  if (guessedLetters.includes(guess)) {
    document.getElementById("resultMessage").textContent = "You already guessed that letter.";
    return;
  }

  guessedLetters.push(guess);

  if (selectedWord.includes(guess)) {
    updateWordDisplay();
    if (wordDisplay.textContent.indexOf("_") === -1) {
      document.getElementById("resultMessage").textContent = "Congratulations! You guessed the word.";
      disableInputAndButton();
      setTimeout(function() {
        initializeGame();
        enableInputAndButton();
      }, 3000);
    }
  } else {
    incorrectGuesses++;
    if (incorrectGuesses === 6) {
      document.getElementById("resultMessage").textContent = "Game over! The word was: " + selectedWord;
      disableInputAndButton();
      setTimeout(function() {
        initializeGame();
        enableInputAndButton();
      }, 3000);
    }
  }

  guessInput.value = "";
  guessInput.focus();
}

function disableInputAndButton() {
  var guessInput = document.getElementById("guessInput");
  var submitButton = document.querySelector("button");

  guessInput.disabled = true;
  submitButton.disabled = true;
}

function enableInputAndButton() {
  var guessInput = document.getElementById("guessInput");
  var submitButton = document.querySelector("button");

  guessInput.disabled = false;
  submitButton.disabled = false;
}

initializeGame();
