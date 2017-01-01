
// ===========================================
// Simon - Countdown
// ===========================================

  var simon = (function(simon) {
    "use strict";

    var start = function() {
      var i = 2;
      var countdown = setInterval(function() {
        $cache("#countdown .overlay__content").html(i);
        i--;

        if (i < 0) {
          clearInterval(countdown);
          $cache("#countdown").addClass("overlay--hidden");
          simon.init();
        }
      }, 800);
    };

    // Public Methods
    // =======================================
    simon.countdown = {
      start: start
    };

    return simon;
  })(simon || {});

