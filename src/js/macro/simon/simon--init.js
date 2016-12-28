
// ===========================================
// Simon - Init
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var newGame = function() {
      simon.sequence = [];
      simon.current = [];
      simon.continue = true;
      simon.freestyle = false;
      simon.nextRound();
    };


    var nextRound = function() {

      $cache(".score").html(simon.sequence.length);

      simon.sequence.push(utility.randomNumber());
      simon.current = simon.sequence.slice(0);

      setTimeout(function(){
        simon.playSequence();
      }, 500)
    };


    var userClick = function(id) {
      simon.animate(id);

      if (!simon.freestyle) {
        var number = simon.current.shift();

        simon.continue = (number == id);
        simon.canContinue();
      }
    };


    var canContinue = function() {

      if (simon.current.length === 0 && simon.continue) {
        simon.stop();
        simon.nextRound();
      } 
      else if (!simon.continue) {
        simon.stop();
        simon.saveMaxScore();
        simon.overlay.show();
      }
    };


    // Public Methods
    // =======================================
    simon.newGame = newGame;
    simon.nextRound = nextRound;
    simon.userClick = userClick;
    simon.canContinue = canContinue;


    return simon;
  })(simon || {});

