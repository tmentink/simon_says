
// ===========================================
// Page - Init
// ===========================================

  !(function(simon) {
    "use strict";

    simon.setMaxScore();
    
    $cache("#new-game").on("click", function() {
      simon.newGame();

      if (!simon.music) {
        simon.startMusic();
      }
    });


  })(simon);

