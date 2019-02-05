var Letter = require("./letter.js");

var Word = function (currentWord) {

    this.currentWord = currentWord;

    // An array of new Letter objects representing the letters of the underlying word
    this.letterArr = [];

    // use for loop to push letters into array
    for (var i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === " ") {
            this.letterArr.push(" ")
        } else {
            this.letterArr.push(new Letter(currentWord[i]));
        }
    }

    // display letters or underscore
    this.createWord = function () {
        var words = "";
        this.letterArr.forEach(function (elem) {
            if (elem === " ") {
                words = " ";
            } else {
                words += elem.showLetter();
            }
        });
        return words;
    }

    // check letters
    this.checkAnswer = function (guess) {
        this.letterArr.forEach(function (elem) {
            if (elem.letter) {
                elem.check(guess);
            } 
        })
    }

    this.isRight = function(guess) {
        if(guess.join() === currentWord.join()) {
            console.log("YOU WIN")
        }
    }
}

module.exports = Word;