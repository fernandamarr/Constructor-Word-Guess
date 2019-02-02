var Letter = require("./letters.js");

function Word(currentWord, letterArr) {
    // Current word being guessed
    this.currentWord = currentWord;

    // An array of new Letter objects representing the letters of the underlying word
    this.letterArr = [];

    // A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
    this.createWord = function () {
        var wordArr = this.currentWord.split("");
        for (var i = 0; i < wordArr.length; i++) {
            var inputLetters = new Letter(wordArr[i]);
            this.letterArr.push(inputLetters);
        }
    }

    // A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js).
    var checkGuess = function (guess) {
        this.letterArr.forEach(letter, function () {
            letter.guessLetter(guess);
        })
    }
}

module.exports = Word;