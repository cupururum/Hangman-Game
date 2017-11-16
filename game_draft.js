var loses = 0;
var wins = 0;
var currentWordP = document.getElementById('currentWord');
var lettersWordLeft;

function game(word, slots) {
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  alphabet = alphabet.map(letter => letter.toUpperCase());
  var userGuess;
  var rigthGuess = 0;
  var wrongGuess = 0;
  var numberOfTries = 8;
  var alreadyGuessArray = [];
  var alreadyGuessed = document.getElementById('alreadyGuessed');
  var chooseFromAlphabet = document.getElementById('chooseAlph');
      document.onkeypress = function(event) {
        userGuess = event.key;
        userGuess = userGuess.toUpperCase();
        // we need to check if the key is from alphabet(not a number etc)
        if (alphabet.indexOf(userGuess) > -1) {
          // First, I check that I didn't make a choise twice
          if (alreadyGuessArray.indexOf(userGuess) == -1) {
            alreadyGuessArray.push(userGuess);
            //publish the guess in the document
            alreadyGuessed.textContent = 'Letters already guessed: ' + alreadyGuessArray.join(' ');
            // Second, I begin to search a character in the word
           if (word.indexOf(userGuess) > -1) {
             //i need to check if the letter represented in my word seversl times
             var currentLetterGuessIndex = word.indexOf(userGuess);
             var indicesOfLetter = [];
             while (currentLetterGuessIndex != -1) {
               indicesOfLetter.push(currentLetterGuessIndex);
               currentLetterGuessIndex = word.indexOf(userGuess, currentLetterGuessIndex + 1);
               console.log(indicesOfLetter);
               // for each index I change the underscore for the letter
               for ( i = 0; i < indicesOfLetter.length; i++) {
                 slots[indicesOfLetter[i]] = userGuess;
                 currentWordP.textContent = "Current word: " + slots.join(' ');

               }//closing for loop after I changed all letters in the word
               lettersWordLeft--;
               console.log('letter left ' + lettersWordLeft );
               if (lettersWordLeft == 0){
                 wins++;
                 document.getElementById('wins').textContent = 'Wins: ' + wins;
                 startGame();
               }
             }//closing the while loop for the all letters in the word
             rigthGuess++; // for the rigthGuess I need to start a counter
             console.log('number of rigth guesses ' + rigthGuess);
           } else {
             wrongGuess++; //wrongGuess counter
             console.log('number of wrong guesses ' + wrongGuess);
             numberOfTries-- // when i pick the wrongGuess I loose my numberOfTries
             console.log('number of tries left ' + numberOfTries);
             if (numberOfTries == 0) {
               loses++;
               document.getElementById('loses').textContent = 'Loses: ' + loses;
               startGame();
              }
             }//closing looking for all letters in the word otherwise it is the wrong guess
         } else {
           //ignore
         } //closing you cannot use the same letter twice!!

        } else {
          chooseFromAlphabet.textContent = 'You need to choose a letter from alphabet: ' + alphabet.join(" ");
        } //closing if letter is not from the alphabet you will see this
      }//closing the document.onkeypress evnt function for the game

  }//closing the game function or actually play game



function startGame() {
  var words = ["harry potter", "muglle", "albus dumbledore"];
  var pickUpWord;
  var pickUpWordSlots = [];
  words = words.map(word => word.toUpperCase());
  pickUpWord = words[Math.floor(Math.random() * words.length)]; // computer choose a word
  for ( j = 0; j < pickUpWord.length; j++) {
     pickUpWordSlots.push('_ ');
  }
  currentWordP.textContent = "Current word: " + pickUpWordSlots.join(' ');// publish underscore word into the doc
      // after I published underscore word I start guessing
  lettersWordLeft = pickUpWord.replace(/\s/g, "").length;

  //choose from alphabet

  game(pickUpWord, pickUpWordSlots);
}

document.onkeypress = function(e) {
    startGame();
 }
