
// ===========================================
// Simon - Overlay
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var show = function(id) {
      $cache(id).removeClass("overlay--hidden");
    };

    var hide = function(id) {
      $cache(id).addClass("overlay--hidden");
    };


    // Public Methods
    // =======================================
    simon.overlay = {
      show: show,
      hide: hide
    };

    return simon;
  })(simon || {});

