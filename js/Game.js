/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor(arr) {
    this.missed = 0;
    this.phrases = arr;
    this.activePhrase = null;
  }

  startGame() {
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "none";
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  getRandomPhrase() {
    const randomNumber = Math.floor(Math.random() * this.phrases.length);
    const randomPhrase = this.phrases[randomNumber];
    return randomPhrase;
  }

  handleInteraction(key, arg) {
    if (arg === "screen") {
      key.className = "disabled";
      if (!this.activePhrase.checkLetter(key)) {
        key.className = "wrong";
        this.removeLife();
      } else {
        key.className = "chosen";
        const letters = document.querySelectorAll(".letter");
        this.activePhrase.showMatchedLetter(letters, key);
        this.checkForWin();
      }
    } else if (arg === "physical") {
      const keys = document.querySelectorAll(".key");
      keys.forEach((x) => {
        if (x.textContent === key) {
          x.className = "disabled";
          if (!this.activePhrase.checkLetter(key)) {
            x.className = "wrong";

            this.removeLife();
          } else {
            x.className = "chosen";

            const letters = document.querySelectorAll(".letter");
            this.activePhrase.showMatchedLetter(letters, key);
            this.checkForWin();
          }
        }
      });
    }
  }

  removeLife() {
    const life = document.querySelector(
      ".tries > img[src='images/liveHeart.png']"
    );
    this.missed += 1;
    life.setAttribute("src", "images/lostHeart.png");
    if (this.missed > 4) {
      this.gameOver(`Try again!`);
    }
  }

  checkForWin() {
    const arr = [];
    const shown = document.querySelectorAll("ul > li[show]");
    for (let i = 0; i < shown.length; i++) {
      arr.push(shown[i]);
    }
    if (arr.length === this.activePhrase.phrase.length) {
      this.gameOver(`Congratulations!`);
    }
  }

  gameOver(message) {
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "";
    document.querySelector("#game-over-message").textContent = message;
    this.reset();
  }

  reset() {
    this.missed = 0;
    const ul = document.querySelector("#phrase > ul");
    const li = document.querySelectorAll(".letter");
    const keys = document.querySelectorAll(".keyrow > button");
    const lives = document.querySelectorAll(
      ".tries > img[src='images/lostHeart.png']"
    );
    li.forEach((item) => {
      ul.removeChild(item);
    });
    keys.forEach((key) => {
      key.className = "key";
    });
    lives.forEach((life) => {
      life.setAttribute("src", "images/liveHeart.png");
    });
  }
}
