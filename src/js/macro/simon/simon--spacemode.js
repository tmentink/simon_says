
// ===========================================
// Simon - Spacemode
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var on = function() {
      $cache("html, body").addClass("space-mode");
      startMusic();
    };

    var off = function() {
      $cache("html, body").removeClass("space-mode");
      stopMusic();
    };


    var startMusic = function() {
      simon.audio = $cache("#audio")[0];
      simon.audio.loop = true;
      simon.audio.play();
    };

    var stopMusic = function() {
      simon.audio.pause();
      simon.audio.currentTime = 0;
    }


    // Public Methods
    // =======================================
    simon.spacemode = {
      on: on,
      off: off
    };

    return simon;
  })(simon || {});

