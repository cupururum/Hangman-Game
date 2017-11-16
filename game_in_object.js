var words = ["harry potter", "muglle", "albus dumbledore"];
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
      't', 'u', 'v', 'w', 'x', 'y', 'z'];
var pickUpWord;
var pickUpWordArray = [];
var beginGame;
var userGuess;
var rigthGuess = 0;
var wrongGuess = 0;
var numberOfTries = 8;
var lettersWordLeft;
var pickUpWordSlots = [];
var alreadyGuessArray = [];
var chooseAlph = document.getElementById('chooseAlph');
var alreadyGuessed = document.getElementById('alreadyGuessed');
var currentWordP = document.getElementById('currentWord');
words = words.map(word => word.toUpperCase());
alphabet = alphabet.map(letter => letter.toUpperCase());


var game = {

  pickUpW: function () {
    pickUpWord = words[Math.floor(Math.random() * words.length)]; // computer choose a word
    for ( j = 0; j < pickUpWord.length; j++) {
       pickUpWordSlots.push('_ ');
    }
    currentWordP.textContent = "Current word: " + pickUpWordSlots.join(' ');// publish underscore word into the doc
        // after I published underscore word I start guessing
    lettersWordLeft = pickUpWord.replace(/\s/g, "").length;
  },

  checkTheGuess: function() {
    if (pickUpWord.indexOf(userGuess) > -1) {
      //i need to check if the letter represented in my word seversl times
      var currentLetterGuessIndex = pickUpWord.indexOf(userGuess);
      var indicesOfLetter = [];
      while (currentLetterGuessIndex != -1) {
        indicesOfLetter.push(currentLetterGuessIndex);
        currentLetterGuessIndex = pickUpWord.indexOf(userGuess, currentLetterGuessIndex + 1);
        console.log(indicesOfLetter);
        // for each index I change the underscore for the letter
        for ( i = 0; i < indicesOfLetter.length; i++) {
          pickUpWordSlots[indicesOfLetter[i]] = userGuess;
          currentWordP.textContent = "Current word: " + pickUpWordSlots.join(' ');
        }//closing for loop after I changed all letters in the word
      }//closing the while loop for the all letters in the word
      rigthGuess++; // for the rigthGuess I need to start a counter
      console.log('number of rigth guesses ' + rigthGuess);
    } else {
      wrongGuess++; //wrongGuess counter
      console.log('number of wrong guesses ' + wrongGuess);
      numberOfTries-- // when i pick the wrongGuess I loose my numberOfTries
      console.log('number of tries left ' + numberOfTries);
    }//closing looking for all letters in the word otherwise it is the wrong guess
  },

  checkhaveAlreadyGuessed: function() {
    if (alreadyGuessArray.indexOf(userGuess) == -1) {
      alreadyGuessArray.push(userGuess);
      //publish the guess in the document
      alreadyGuessed.textContent = 'Letters already guessed: ' + alreadyGuessArray.join(' ');
      this.checkTheGuess();
    } else {
      //ignore
    }
  },

  checkFromAlphabet: function() {
    if (alphabet.indexOf(userGuess) > -1) {
      this.checkhaveAlreadyGuessed();
    } else {
      chooseAlph.textContent = 'You need to choose a letter from alphabet: ' + alphabet.join(" ");
    }
  },



}

document.onkeypress = function(event) {
  game.pickUpW();
  document.onkeypress = function(e) {
    userGuess = e.key;
    userGuess = userGuess.toUpperCase();
    game.checkFromAlphabet();
  }
}
