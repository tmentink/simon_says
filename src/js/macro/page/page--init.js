
// ===========================================
// Page - Init
// ===========================================

  !(function(simon) {
    "use strict";

    $cache("#btnPlayMusic").on("click", function(){
      simon.music.init();
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

