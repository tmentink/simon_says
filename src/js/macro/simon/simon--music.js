
// ===========================================
// Simon - Music
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var on = function() {
      simon.audio = $cache("#audio")[0];
      simon.audio.play();
    };

    var off = function() {
      simon.audio.pause();
      simon.audio.currentTime = 0;
    };

    var mute = function() {
      simon.audio.volume = simon.audio.volume == 0.0 ? 1.0 : 0;
    };


    // Public Methods
    // =======================================
    simon.music = {
      on: on,
      off: off,
      mute: mute
    };

    return simon;
  })(simon || {});

