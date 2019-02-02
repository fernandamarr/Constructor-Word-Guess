// at start of game, I want to reset the game play for user to get a random word

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

var lettersGuessed = [];
var guessesLeft = 15;

function hello() {
    console.log("\nHey there! Welcome to Word Guess - Pokemon Edition!!\n")
    console.log("-------------------------------------------------------")
    startGame();
}

// conditions to start game
function startGame() {
    currentWord = "";
    lettersGuessed;
    guessesLeft;
    if (wordBank.length === 0) {
        wordBank = ["pikachu", "charmander", "squirtle", "eevee", "snorlax", "bulbasaur", "dragonite", "togepi", "seel", "ponyta"];
    }
    prompt();
}

// Prompt user for letter
function prompt() {
    if (guessesLeft > 0) {
        inquirer.prompt([{
            type: "input",
            name: "letter",
            message: "\n" + "Gotta catch 'em all!".rainbow + "\n\n" + "Type in a letter and press enter: "
        }]).then(function (answers) {
            checkInput(answers)
            console.log(chosenWord)

        })
    }
}

// check if user guess is right or wrong
function checkInput(answers) {
    if (answers.letter === chosenWord) {
        console.log("ya")
    } else {
        console.log("no")
    }
}


startGame();