
// ===========================================
// Simon - Game Over
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var show = function() {
      $cache("#gameover").removeClass("overlay--hidden");
    };

    var hide = function() {
      $cache("#gameover").addClass("overlay--hidden");
    };


    // Public Methods
    // =======================================
    simon.gameover = {
      show: show,
      hide: hide
    };

    return simon;
  })(simon || {});

