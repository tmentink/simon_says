
// ===========================================
// Page - Init
// ===========================================

  !(function(simon) {
    "use strict";

    $cache("#btnPlayMusic").on("click", function(){
      simon.music.on();
      simon.countdown.start();
      simon.overlay.hide("#music");
    });

    $cache("#btnNoMusic").on("click", function(){
      simon.countdown.start();
      simon.overlay.hide("#music");
    });

    $cache("#btnPlayAgain").on("click", function() {
      simon.overlay.hide("#gameover");
      simon.newGame();
    });

  })(simon);

