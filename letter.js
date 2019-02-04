// Constructor function for defining word guess
var Letter = function(letter) {
    this.letter = letter;
    this.guessed = false;

    // check if letter was guessed
    this.showLetter = function () {
        if (!this.guessed) {
            return " _ ";
        } else {
            return this.letter;
        }
    }

    // check if letter was guessed correctly, change guessed var to true
    this.check = function (guess) {
        if (guess.toLowerCase() === this.letter.toLowerCase()) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;