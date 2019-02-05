// Left To Do:
// Replace underscores with user input
// If letter is completely guessed correcrlty, user wins

var Word = require("./word.js");
var inquirer = require("inquirer");
var colors = require("colors");

var wordBank = ["pikachu", "charmander", "squirtle", "eevee", "snorlax", "bulbasaur", "dragonite", "togepi", "seel", "ponyta"];

var onlyLetters = /[a-zA-Z]/;
var lettersGuessed = [];
var checkInput = [];
var guessesLeft = 10;

// Intro to game prompt
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
            console.log("\nWelcome " + answers.name.bgMagenta + "! This is Word Guess - Pokemon Edition." + "\n\nGotta catch 'em all!".rainbow + "\n")
            play();
        } else {
            console.log("\nOkay, but you're missing out!");
        }
    })
}

// Randomize words and call start game function
var play = function () {
    // Select random word from wordBank
    var random = Math.floor(Math.random() * wordBank.length);
    chosenWord = wordBank[random];
    // Store random word in Word constructor
    currentWord = new Word(chosenWord);
    currentWord.createWord();
    startGame(currentWord, chosenWord);
}

// Game prompt for guesses
var startGame = function (currentWord, chosenWord) {
    console.log(currentWord.createWord());
    if (guessesLeft) {

        // testing
        console.log(chosenWord)

        inquirer.prompt([{
            name: "userGuess",
            type: "input",
            message: "\nType a letter and press enter: ".yellow,
            validate: function validateLetter(input) {
                if (!input.match(onlyLetters)) {
                    return "Try again. Type only letters".red;
                } else {
                    return true;
                }
            }
        }]).then(function (data) {
            checkInput(data)
        })
    } else {
        console.log("\nYou're out of guesses! The pokemon that got away was " + chosenWord.toUpperCase().rainbow + "\n");
        playAgain();
    }
}

// Check if user input is correct
var checkInput = function (data) {
    if (lettersGuessed.includes(data.userGuess)) {
        console.log("You already guessed that. Try again".cyan);
        startGame(currentWord, chosenWord);
    } else {
        if (chosenWord.includes(data.userGuess)) {
            lettersGuessed.push(data.userGuess);
            console.log("THAT IS CORRECT!".cyan + "\n");

            // ******** need to replace the underscore with user guess ******** buthow
            // push data.userGuess to createWord() ?

            startGame(currentWord, chosenWord);
        } else {
            console.log("INCORRECT!".cyan);
            lettersGuessed.push(data.userGuess);
            guessesLeft--;
            console.log("You have " + guessesLeft + " guesses left\n")
            startGame(currentWord, chosenWord);
        }
    }
}

// Prompt user if they want to play again
var playAgain = function () {
    if (guessesLeft === 0) {
        inquirer.prompt([{
            name: "playAgain",
            type: "list",
            message: "Want to try again?",
            choices: ["Yes, gotta catch 'em all!", "No, I'm good"]
        }]).then(function (answers) {
            if (answers.playAgain === "Yes, gotta catch 'em all!") {
                guessesLeft = 10;
                play();
            }
            if (answers.playAgain === "No, I'm good") {
                console.log("\nGAME OVER".red);
            }
        })
    }
}

readyToStart();