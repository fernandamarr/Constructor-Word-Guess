// Constructor function for defining word guess
function Letter(letter, guessed) {
    this.letter = letter;
    this.guessed = guessed;
    this.char = function () {
        if (!this.guessed) {
            return "_";
        } else {
            return this.letter;
        }
    }
    this.guessLetter = function (character) {
        if (character === this.letter) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;