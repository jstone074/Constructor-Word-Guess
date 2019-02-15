var inquirer = require("inquirer");
var Word = require("./Word.js");
var guesses = 10;

var wordList = ["Harry", "Ron", "Hermione", "Broom", "Wand", "Quidditch", "Dumbledore", "Snape", "Muggle", "Hagrid", "Snitch"]
var validKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var randomWord;
var chosenWord;

function startGame() {

    console.log("H      H     A       RRRRRRR     RRRRRRR   Y   Y    PPPPPP OOOOOOOO  TTTTTTTT TTTTTTTT EEEEEEEE  RRRRRRR                                    ");
    console.log("H      H    A A      R     R     R     R    Y Y     P    P O      O     TT       TT    E         R     R                 ");
    console.log("HHHHHHHH   A A A     RRRRRRR     RRRRRRR     Y      PPPPPP O      O     TT       TT    EEEEEEEE  RRRRRRR                     " );
    console.log("H      H  A     A    R      R    R     R     Y      P      O      O     TT       TT    E         R     R         ");
    console.log("H      H A       A   R       R   R      R    Y      P      OOOOOOOO     TT       TT    EEEEEEEE  R      R         " );
}

function chooseRandomWord() {

    randomWord = wordList[Math.floor(Math.random() * wordList.length)]

    chosenWord = new Word(randomWord);
}

function guessWord() {

    if (guesses > 0) {

        console.log(chosenWord.display());
    

        inquirer.prompt([
            {
                name: "txt",
                message: "Guess a letter!",
                validate: function (value) {

                  if (validKeys.includes(value)) {
                      return true;
                  } else {
                      console.log("\nPlease enter a valid guess");
                  }

            }

            }

        ]).then(function (guessedLetter) {

            var guess = guessedLetter.txt;

            chosenWord.checkGuess(guess);

            if (randomWord.toLowerCase().indexOf(guess.toLowerCase()) === -1) {
                guesses--;
                console.log("That's not right " + guesses + " guesses remaining")
            } 
            

            if (randomWord === chosenWord.display()) {
                console.log(chosenWord.display());
                guesses = 10;
            
                    winGame();
                }
            

            if (guesses === 0) {
                loseGame();
            }

            guessWord();

        });
    }

}

function loseGame() {
    console.log("GAME OVER!");
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play again?",
            default: true
        }
    ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                guesses = 10;
                chooseRandomWord();
                guessWord();
            }
            else {
                console.log("See you next time!!");
                process.exit();
            }
        })
}

function winGame() {
    console.log("You Win!");
  
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play again?",
            // default: true
        }
    ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                guesses = 10;
                chooseRandomWord();
                guessWord();
            }
            else {
                console.log("See you next time!");
                process.exit();
            }
        })

}

startGame();
chooseRandomWord();
guessWord();