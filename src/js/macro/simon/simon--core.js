
// ===========================================
// Simon - Core
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var init = function() {
      simon.score.setMax();
      simon.music.on();
      simon.newGame();
    };

    var newGame = function() {
      simon.sequence = [];
      simon.current = [];
      simon.freestyle = false;
      nextRound();
    };

    var nextRound = function() {
      simon.events.off();
      simon.score.set();
      simon.sequence.push(utility.randomNumber());
      simon.current = simon.sequence.slice();

      setTimeout(function(){
        simon.playSequence();
      }, 500);
    };

    var userClick = function(userInput) {
      simon.animate(userInput);

      if (!simon.freestyle) {
        canContinue(userInput);
      }
    };

    var canContinue = function(userInput) {
      if (correctNumber(userInput)) { 

        if (lastNumber()) {
          nextRound();
        }
      } 
      else {
        simon.events.off();
        simon.score.saveMax();
        simon.gameover.show();
      }
    };

    var correctNumber = function(userInput) {
      var nextNumber = simon.current.shift();
      return (userInput == nextNumber);
    };

    var lastNumber = function() {
      return simon.current.length === 0;
    };


    // Public Methods
    // =======================================
    simon.init = init;
    simon.newGame = newGame;
    simon.userClick = userClick;


    return simon;
  })(simon || {});

