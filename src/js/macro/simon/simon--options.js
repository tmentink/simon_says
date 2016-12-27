
// ===========================================
// Simon - Options
// ===========================================

  var simon = (function(simon) {
    "use strict";
  

    var startMusic = function() {
      simon.audio = $cache("#audio")[0];
      simon.audio.play();
      simon.music = true;
    };

    var stopMusic = function() {
      simon.audio.pause();
      simon.audio.currentTime = 0;
      simon.music = false;
    }


    // Public Methods
    // =======================================
    simon.startMusic = startMusic;
    simon.stopMuisc = stopMusic;

    return simon;
  })(simon || {});

