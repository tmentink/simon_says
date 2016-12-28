
// ===========================================
// Page - Init
// ===========================================

  !(function(simon) {
    "use strict";

    simon.setMaxScore();
    
    $cache("#btnNewGame").on("click", function() {
      simon.newGame();

      if (!simon.music) {
        simon.startMusic();
      }
    });

    $cache("#btnPlayAgain").on("click", function() {
      simon.overlay.hide();
      simon.newGame();
    });


  })(simon);

