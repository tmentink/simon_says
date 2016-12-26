
// ===========================================
// Page - Init
// ===========================================

  !(function(simon) {
    "use strict";

    simon.setMaxScore();
    
    $cache("#new-game").on("click", function() {
      simon.newGame();
    });

    $cache("#space-mode").on("click", function() {
      var icon = $(this).find("i");
      icon.toggleClass("fa-square-o fa-check-square");

      if (icon.hasClass("fa-square-o")) {
        simon.spacemode.off();
      }
      else {
        simon.spacemode.on();
      }
    });

  })(simon);

