/**
 * The array that contains the five phrases for the game.
 */

const phraseArray = [];
const phrase1 = new Phrase("javascript");
const phrase2 = new Phrase("python");
const phrase3 = new Phrase("html");
const phrase4 = new Phrase("css");
const phrase5 = new Phrase("django");
phraseArray.push(phrase1, phrase2, phrase3, phrase4, phrase5);

const keys = document.querySelectorAll(".key");
const btn = document.querySelector("#btn__reset");
const game = new Game(phraseArray);

/**
 * "Start Game" button listens for a "click" event and once a click event occurs it then creates a new game object and the header/title of the game.
 */

btn.addEventListener("click", function () {
  game.startGame();
  //Creates the h2 element of the game.
  const header = document.createElement("h2");
  const banner = document.querySelector("#banner");
  header.className = "header";
  header.textContent = "Guess the word";
  banner.appendChild(header);
});

/**
 * Each key on the onscreen keyboard listens for a "click" event and then calls the game object's handleInteracion() method which passes on the targeted key's value (From the onscreen keyboard) and a string argument.
 */

keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    game.handleInteraction(e.target, "onscreen");
  });
});

/**
 * Listens for a "keydown" event and then calls the game object's handleInteracion() method which passes on the targeted key's value (From the physical computer keyboard) and a string argument.
 */

document.addEventListener("keydown", (e) => {
  game.handleInteraction(e.key, "physical");
});
