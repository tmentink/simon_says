
// ===========================================
// Simon - Music
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var init = function() {
      simon.audio = $cache("#audio")[0];
      simon.audio.play();
      simon.audio.muted = true;
      simon.playMusic = true;
    };

    var on = function() {
      simon.audio.muted = false;
      simon.audio.currentTime = 0;
      simon.audio.play();
    };

    var off = function() {
      simon.audio.pause();
      simon.audio.currentTime = 0;
    };

    var mute = function() {
      simon.audio.muted = !simon.audio.muted;
    };


    // Public Methods
    // =======================================
    simon.music = {
      on: on,
      off: off,
      mute: mute,
      init: init
    };

    return simon;
  })(simon || {});

