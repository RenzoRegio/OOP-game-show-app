class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Creates and presents the display of the letters on the screen once the game starts.
   * @param {String} phrase - A string of letters that is then presented on the screen as the word to be guessed by the user.
   */

  addPhraseToDisplay(phrase) {
    const phraseBox = document.querySelector("#phrase > ul");
    phrase = this.phrase.split("");
    phrase.forEach((letter) => {
      const li = document.createElement("li");
      li.textContent = letter;
      if (li.textContent === " ") {
        li.className = "space";
      } else {
        li.className = `hide letter ${letter}`;
      }
      phraseBox.appendChild(li);
    });
  }

  /**
   * Checks if the phrase inclused the textContent of the key value on the screen or the key value of the keyboard.
   * @param {Event} key - Represents either the value of the key on the on-screen keyboard or the value of the physical keyboard's key. These are coming from the event listeners on app.js.
   */

  checkLetter(key) {
    if (this.phrase.includes(key.textContent || key)) {
      return true;
    }
  }

  /**
   * Checks if the key input (either from the screen or the keyboard) matches any of the letters from the phrase. If there is a match, then the letter matching the key selected will be shown on the screen.
   * @param {Array} phrase - An array of list items containing the letters from the phrase to be guessed.
   * @param {Event} key - Represents either the value of the key on the on-screen keyboard or the value of the physical keyboard's key. These are coming from the event listeners on app.js.
   */

  showMatchedLetter(phrase, key) {
    for (let i = 0; i < phrase.length; i++) {
      if (
        phrase[i].textContent === key.textContent ||
        phrase[i].textContent === key
      ) {
        phrase[i].classList.add("show");
        phrase[i].classList.remove("hide");
        phrase[i].setAttribute("show", "");
      }
    }
  }
}
