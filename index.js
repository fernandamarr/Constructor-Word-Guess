var Word = require("./word.js");
var inquirer = require("inquirer");
var colors = require("colors");

var wordBank = ["pikachu", "charmander", "squirtle", "eevee", "snorlax", "bulbasaur", "dragonite", "togepi", "seel", "ponyta"];

// Select random word from wordBank
var random = Math.floor(Math.random() * wordBank.length);
chosenWord = wordBank[random];
// Store random word in Word constructor
currentWord = new Word(chosenWord);
currentWord.createWord();

var onlyLetters = /[a-zA-Z]/;
var lettersGuessed = [];
var checkInput = [];
var guessesLeft = 10;

var readyToStart = function () {
    console.log("\nHey there! Welcome to Word Guess - Pokemon Edition!!\n")
    console.log("-------------------------------------------------------");
    inquirer.prompt([{
            type: "text",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "confirm",
            name: "ready",
            message: "Ready to begin?",
            default: true
        }
    ]).then(function (answers) {
        if (answers.ready) {
            console.log("\nWelcome " + answers.name + ". This is Word Guess - Pokemon Edition!" + "\n\nGotta catch 'em all!".rainbow + "\n")
            startGame(currentWord, chosenWord);
        } else {
            console.log("\nOkay, but you're missing out!");
        }
    })
}

var startGame = function (currentWord, chosenWord) {
    console.log(currentWord.createWord());
    currentWord.letterArr.forEach(function (elem) {
        lettersGuessed.push(elem.letter);
    })

    if (guessesLeft) {

        //testing
        console.log(chosenWord)

        inquirer.prompt([{
            name: "userGuess",
            type: "input",
            message: "\nType a letter and press enter: ".yellow,
            validate: function validateLetter(input) {
                if (!input.match(onlyLetters)) {
                    return "Try again. Type in only letters".red;
                } else {
                    return true;
                }
            }
        }]).then(function (data) {
            checkInput(data)

        })
    } else {
        console.log("\nYou're out of guesses! The pokemon that got away was " + chosenWord.toUpperCase().rainbow);
        playAgain();
    }
}

var checkInput = function (data) {

    if (chosenWord.includes(data.userGuess)) {
        console.log("THAT IS CORRECT!".cyan);
        
    } else {
        console.log("INCORRECT!".cyan);
        guessesLeft--;
        console.log("You have " + guessesLeft + " guesses left")
    }
}

// Prompt user if they want to play again
var playAgain = function () {
    if (guessesLeft === 0) {
        inquirer.prompt([{
            name: "restart",
            message: "Want to try again?",
            choices: ["Yes, gotta catch 'em all!", "No, I'm done"]
        }]).then(function (answer) {
            if (answer.choices[0]) {
                startGame();
            } else {
                answer.end();
            }
        })
    }
}

readyToStart();