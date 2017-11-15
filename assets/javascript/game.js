//var guessWord;

var words = ["harry potter", "muglle", "albus dumbledore"];
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
      't', 'u', 'v', 'w', 'x', 'y', 'z'];
var pickUpWord;
var beginGame;
var userGuess;
var rigthGuess;
var wrongGuess;
var lettersWordLeft;
var pickUpWordSlots = [];
var alreadyGuessArray = [];
var chooseAlph = document.getElementById('chooseAlph');
var alreadyGuessed = document.getElementById('alreadyGuessed');
var currentWordP = document.getElementById('currentWord');
words = words.map(word => word.toUpperCase());
alphabet = alphabet.map(letter => letter.toUpperCase());


function game() {

  pickUpWord = words[Math.floor(Math.random() * words.length)]; // computer choose a word
  lettersWordLeft = pickUpWord.length;
  console.log(lettersWordLeft);
  for ( i = 0; i < pickUpWord.length; i++) { //transform it in to the undersore positions for each letter
          pickUpWordSlots.push('_');
  }

  currentWordP.textContent = "Current word: " + pickUpWordSlots.join(' ');// publish underscore word into the doc

      // after I published underscore word I start guessing


  do {
          document.onkeypress = function(e) {
              userGuess = e.key;
              userGuess = userGuess.toUpperCase();

              // we need to check if the key is from alphabet(not a number etc)
              if (alphabet.indexOf(userGuess) > -1) {

                    //if from alphabet I store guess


                    // if from alphabet I begin to search the character in the word
                    // First, I check that I didn't make a choise twice
                    if (alreadyGuessArray.indexOf(userGuess) == -1) {

                        alreadyGuessArray.push(userGuess);
                        //publish the guess in the document
                        alreadyGuessed.textContent = 'Letters already guessed: ' + alreadyGuessArray.join(' ');

                        // Second, I begin to search a character in the word
                            if (pickUpWord.indexOf(userGuess) > -1) {
                                var currentLetterGuessIndex = pickUpWord.indexOf(userGuess);
                                pickUpWordSlots[currentLetterGuessIndex] = userGuess;
                                currentWord.textContent = "Current word: " + pickUpWordSlots.join(' ');
                                rigthGuess += 1;
                                console.log(rigthGuess);
                                lettersWordLeft = lettersWordLeft - 1;
                                console.log(lettersWordLeft);

                             } else {
                                 wrongGuess += 1;
                             }
                    } else {
                          //ignore!
                    }

              } else {
                chooseAlph.textContent = 'You need to choose a letter from alphabet: ' + alphabet.join(" ");
              }
        }
  } while ( lettersWordLeft == 0);

}


document.onkeypress = function(e) {
  game();
}
// window.addEventListener('onkeyup', () => {
//   game();
// });








//press any key o begin


// for (var i = 0; i < pickUpWord.length; i++) {
//
//     pickUpWord[i] = "_";
//     pickUpWordSlots.push(pickUpWord[i]);
//     console.log(pickUpWordSlots);
//   }



// var remainingLetters = pickUpWord.length;
// console.log(remainingLetters); //keeps track of the number of the ramaing letters
// //of the picked up word
//
//
//
//
// function chooseLetter(){
//
//
//
//
// };*/
