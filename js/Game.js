class Game {
  constructor(arr) {
    this.missed = 0;
    this.phrases = arr;
    this.activePhrase = null;
  }

  /**
   * Called on app.js - Starts the game by setting the activePhrase from getRandomPhrase() method and setting activePhrase as the phrase to display (or to be guessed) by calling addPhraseToDisplay().
   */

  startGame() {
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "none";
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Returns a random phrase from the phrase array.
   */

  getRandomPhrase() {
    const randomNumber = Math.floor(Math.random() * this.phrases.length);
    const randomPhrase = this.phrases[randomNumber];
    return randomPhrase;
  }

  /**
   * Checks to see if the button (key) pressed by the player matches a letter from either the onscreen keyboard or the physical computer keyboard and then directs the game based on a correct or incorrect guess.
   * @param {Event} key - Represents either the value of the key on the on-screen keyboard or the value of the physical keyboard's key. These are coming from the event listeners on app.js.
   * @param {String} arg - A string that determines if the key selected is either from the "onscreen" (onscreen keyboard) or "physical" (physical computer keyboard).
   */

  handleInteraction(key, arg) {
    function changeClass(element, name) {
      element.className = name;
    }
    const letters = document.querySelectorAll(".letter");
    const keys = document.querySelectorAll(".key");
    const phrase = this.activePhrase;

    // Onscreen Keyboard
    if (arg === "onscreen") {
      changeClass(key, "disabled");
      if (!phrase.checkLetter(key)) {
        changeClass(key, "wrong");
        this.removeLife();
      } else {
        changeClass(key, "chosen");
        phrase.showMatchedLetter(letters, key);
        this.checkForWin();
      }

      //Physical Computer Keyboard
    } else if (arg === "physical") {
      keys.forEach((letter) => {
        if (letter.textContent === key) {
          changeClass(letter, "disabled");
          if (!phrase.checkLetter(key)) {
            changeClass(letter, "wrong");
            this.removeLife();
          } else {
            changeClass(letter, "chosen");
            phrase.showMatchedLetter(letters, key);
            this.checkForWin();
          }
        }
      });
    }
  }

  /**
   * Removes a life from the scoreboard by replacing the heart images and calls gameOver() method if the missed property is greater than 4.
   */

  removeLife() {
    const life = document.querySelector(
      ".tries > img[src='images/liveHeart.png']"
    );
    const lastLifeParent = life.parentNode;
    this.missed += 1;
    life.setAttribute("src", "images/lostHeart.png");
    if (this.missed === 4) {
      //Adding the lastLife class to the last heart image for it to have a heartbeat effect.
      lastLifeParent.nextElementSibling.firstElementChild.className =
        "lastLife";
    }
    if (this.missed > 4) {
      this.gameOver(`You were almost there.. Try again!`);
    }
  }

  /**
   * Checks to see if the player has revealed all the letters in the phrase and if all the letters are revealed then it will call the gameOver() method with a congratulatory message.
   */

  checkForWin() {
    const arr = [];
    const shown = document.querySelectorAll("ul > li[show]");
    for (let i = 0; i < shown.length; i++) {
      arr.push(shown[i]);
    }
    if (arr.length === this.activePhrase.phrase.length) {
      this.gameOver(`Congratulations! You got it!`);
    }
  }

  /**
   * Once called, the gameOver() method displays the overlay depending if the user has won or lost the game.
   * @param {String} message - A string that is passed on that would either show a congratulatory message or a try again message.
   */

  gameOver(message) {
    const overlay = document.querySelector("#overlay");
    const lastLife = document.querySelector(".lastLife");
    overlay.style.display = "";
    document.querySelector("#game-over-message").textContent = message;
    if (message === "Congratulations! You got it!") {
      overlay.className = "win";
      if (lastLife) {
        lastLife.className = "";
      }
    } else {
      overlay.className = "lose";
    }
    this.reset();
  }

  /**
   * After a game is completed, the reset() method is called and reverts all values/elements that was manipulated to its default or original phase.
   */

  reset() {
    this.missed = 0;

    // Removes the "Guess the word" <h2> element.
    const banner = document.querySelector("#banner");
    const header = document.querySelector(".header");
    banner.removeChild(header);

    //Removes all the <li> from the previous phrase and resets the phraseContainer to its default for the next game to receive the new <li> for the new phrase selected.
    const letters = document.querySelectorAll(".letter");
    const phraseContainer = document.querySelector("#phrase > ul");
    letters.forEach((letter) => {
      phraseContainer.removeChild(letter);
    });

    //Reverts the class name of all keys on the onscreen keyboard back to "key" since keys that were targeted earlier in the game would have had either a "chosen" or "wrong" class name.
    const keys = document.querySelectorAll(".keyrow > button");
    keys.forEach((key) => {
      key.className = "key";
    });

    //Sets all the heart images that had a images/lostHeart.png to have images/liveHeart.png.
    const lives = document.querySelectorAll(
      ".tries > img[src='images/lostHeart.png']"
    );
    lives.forEach((life) => {
      life.setAttribute("src", "images/liveHeart.png");
      life.className = "";
    });
  }
}
