
// ===========================================
// Page - Init
// ===========================================

  !(function(simon) {
    "use strict";

    simon.countdown.start();
    
    $cache("#btnPlayAgain").on("click", function() {
      simon.gameover.hide();
      simon.newGame();
    });

    $cache("#mute").on("click", function() {
      var icon = $(this).find("i");
      icon.toggleClass("fa-square-o fa-check-square");

      simon.music.mute();
    });

    $cache("#freestyle").on("click", function() {
      var icon = $(this).find("i");
      icon.toggleClass("fa-square-o fa-check-square");

      simon.freestyle = icon.hasClass("fa-check-square");
    });

  })(simon);

