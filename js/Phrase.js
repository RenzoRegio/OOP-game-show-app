/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

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

  checkLetter(key) {
    if (this.phrase.includes(key.textContent || key)) {
      return true;
    }
  }

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
