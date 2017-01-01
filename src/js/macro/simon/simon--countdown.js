
// ===========================================
// Simon - Countdown
// ===========================================

  var simon = (function(simon) {
    "use strict";

    var start = function() {
      setHTML(3);

      var i = 2;
      var interval = setInterval(function() {
        setHTML(i);
        i--;

        if (i < 0) {
          clearInterval(interval);
          simon.overlay.hide("#countdown");
          simon.init();
        }
      }, 800);
    };

    var setHTML = function(number) {
      $cache("#countdown .overlay__content").html(number);
    };


    // Public Methods
    // =======================================
    simon.countdown = {
      start: start
    };

    return simon;
  })(simon || {});

